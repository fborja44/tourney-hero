import { createContext, useContext, useState } from 'react';
import OBSWebSocket from 'obs-websocket-js';
import { useDispatch, useSelector } from 'react-redux';
import {
	setCurrentOBSScene,
	setOBSScenesCollections,
	setOBSScenesList
} from '@redux/actions/obsActions';
import { useToastController } from '@fluentui/react-components';
import MessageToast from '@renderer/components/toasts/MessageToast';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { BrowserSource, SceneData } from '@common/interfaces/Types';
import { SocketClientContext } from '@renderer/socket/SocketClientProvider';
import { getPortFromAddress } from '@renderer/utils/string';

interface OBSWebSocketProviderProps {
	children: React.ReactNode;
}

interface OBSWebSocketClientState {
	address: string;
	port: string;
	obs: OBSWebSocket | null;
	connected: boolean;
	connect: ((address: string, port: string, password: string) => Promise<boolean>) | undefined;
	disconnect: (() => void) | undefined;
	switchCurrentSceneProgram: ((sceneName: string) => void) | undefined;
	createOBSScene: ((sceneData: SceneData) => void) | undefined;
	createOBSSceneCollection: ((sceneCollectionName: string) => void) | undefined;
	repairOBSScene: ((scene: SceneData) => void) | undefined;
}

const defaultAddress = 'ws://127.0.0.1';
const defaultPort = '4455';

export const OBSWebSocketClientContext = createContext<OBSWebSocketClientState>({
	address: defaultAddress,
	port: defaultPort,
	obs: null,
	connected: false,
	connect: undefined,
	disconnect: undefined,
	switchCurrentSceneProgram: undefined,
	createOBSScene: undefined,
	createOBSSceneCollection: undefined,
	repairOBSScene: undefined
});

/**
 * OBS Websocket Client setup
 */
const OBSWebSocketClientProvider = ({ children }: OBSWebSocketProviderProps) => {
	const dispatch = useDispatch();

	const { dispatchToast } = useToastController('toaster');

	const [websocket, setWebSocket] = useState<OBSWebSocket | null>(null);
	const [connected, setConnected] = useState<boolean>(false);
	const [address, setAddress] = useState<string>(defaultAddress);
	const [port, setPort] = useState<string>(defaultPort);

	const sceneState = useSelector((state: AppState) => state.scenesState);

	const { address: serverAddress } = useContext(SocketClientContext);

	/**
	 * Connect to a obs websocket server.
	 * @param address The server to connect to.
	 * @param port The server port
	 * @param password The user's password to authenticate
	 */
	const connect = async (address: string, port: string, password: string): Promise<boolean> => {
		try {
			const obs = new OBSWebSocket();
			setWebSocket(obs);

			// Attempt connection
			try {
				const result = await obs.connect(`${address}:${port}`, password);
				console.log('Connected to OBS');
				console.log(result);
				dispatchToast(<MessageToast title="Connected To OBS Websocket" />, {
					intent: 'success'
				});
			} catch (err) {
				console.error(err);
				dispatchToast(<MessageToast title="OBS Websocket Connection Failed" />, {
					intent: 'error'
				});
				return false;
			}

			// Get current scene list
			updateSceneState(obs);

			// Set event listeners
			obs.once('ExitStarted', () => {
				console.log('OBS Closed');
				websocket?.disconnect();
				setConnected(false);
			});

			obs.on('SceneListChanged', (event) => {
				console.log('Scene List Changed');
				dispatch(setOBSScenesList(event.scenes));
			});

			obs.on('CurrentProgramSceneChanged', (event) => {
				console.log(`Current Scene Changed: ${event.sceneName}`);
				dispatch(setCurrentOBSScene(event.sceneName));
			});

			obs.on('CurrentSceneCollectionChanged', async () => {
				console.log('Current Scene Collection Changed');
				updateSceneState(obs);
				// const { sceneCollections } = await obs.call('GetSceneCollectionList');
				// dispatch(setOBSScenesCollections(sceneCollections));
			});

			obs.on('SceneCollectionListChanged', async (event) => {
				console.log('Scene Collection List Changed');
				dispatch(setOBSScenesCollections(event.sceneCollections));
			});

			setAddress(address);
			setPort(port);
			setConnected(true);
			return true;
		} catch (err) {
			console.error(err);
			setWebSocket(null);
			setAddress('');
			setPort('');
			setConnected(false);
			return false;
		}
	};

	/**
	 * Updates the scene state based on the current scene list.
	 * @param obs OBS Websocket object
	 */
	const updateSceneState = async (obs: OBSWebSocket) => {
		const sceneData = await obs.call('GetSceneList');
		dispatch(setOBSScenesList(sceneData.scenes));
		dispatch(setCurrentOBSScene(sceneData.currentProgramSceneName));

		const collectionData = await obs.call('GetSceneCollectionList');
		dispatch(setOBSScenesCollections(collectionData.sceneCollections));
	};

	/**
	 * Sends a request through OBS Websocket to set the current program scene
	 */
	const switchCurrentSceneProgram = async (sceneName: string) => {
		if (!(websocket && connected)) {
			console.error('OBS Not Connected; Failed to switch scene.');
			return;
		}

		try {
			await websocket.call('SetCurrentProgramScene', { sceneName });
		} catch (err) {
			console.error(err);
		}
	};

	/**
	 * Creates a browser source in the specified scene.
	 * @param sceneName The scene to create the browser source in.
	 * @param source The browser source to create.
	 */
	const createBrowserSource = async (sceneName: string, source: BrowserSource) => {
		if (!(websocket && connected)) {
			console.error('OBS Not Connected; Failed to browser source.');
			return;
		}

		try {
			// Check if input exists in list
			const { inputs } = await websocket.call('GetInputList');
			if (inputs.some((input) => input.inputName === source.sourceName)) {
				// Input already exists
				await websocket.call('CreateSceneItem', {
					sceneName,
					sourceName: source.sourceName
				});
			} else {
				// Input does not exist, create a new one
				await websocket.call('CreateInput', {
					sceneName,
					inputName: source.sourceName,
					inputKind: 'browser_source',
					inputSettings: {
						url: `http://localhost:${getPortFromAddress(serverAddress) ?? '3001'}${source.endpoint}`,
						width: source.width ?? 1920,
						height: source.height ?? 1080,
						shutdown: source.shutdown ?? true
					}
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	/**
	 * Sets the settings of a browser srouce.
	 * @param source The browser source data to update.
	 */
	const setBrowserSourceSettings = async (source: BrowserSource) => {
		if (!(websocket && connected)) {
			console.error('OBS Not Connected; Failed to set browser source settings.');
			return;
		}

		try {
			await websocket.call('SetInputSettings', {
				inputName: source.sourceName,
				inputSettings: {
					url: `http://localhost:${getPortFromAddress(serverAddress) ?? '3001'}${source.endpoint}`,
					width: source.width ?? 1920,
					height: source.height ?? 1080,
					shutdown: source.shutdown ?? true
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	/**
	 * Sends a request to delete an OBS input.
	 * @param sceneName The scene of the item to delete.
	 * @param inputName The item to delete
	 */
	// const deleteOBSInput = async (inputName: string) => {
	// 	if (!(websocket && connected)) {
	// 		console.error('OBS Not Connected; Failed to create scene.');
	// 		return;
	// 	}

	// 	try {
	// 		await websocket.call('RemoveInput', {
	// 			inputName
	// 		});
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	/**
	 * Creates scene items within an app scene.
	 * @param sceneData The scene data to create
	 */
	const createOBSSceneItems = async (sceneData: SceneData) => {
		if (!(websocket && connected)) {
			console.error('OBS Not Connected; Failed to create scene.');
			return;
		}

		try {
			// Create peripheral items
			for (const source of sceneData.peripheralSources ?? []) {
				await createBrowserSource(sceneData.title, source);
			}
			// Create primary source
			await createBrowserSource(sceneData.title, sceneData.source);
		} catch (err) {
			console.error(err);
		}
	};

	/**
	 * Sends a request through OBS Websocket to create a new scene
	 * @param sceneData The app scene data to use, if provided
	 */
	const createOBSScene = async (sceneData: SceneData) => {
		if (!(websocket && connected)) {
			console.error('OBS Not Connected; Failed to create scene.');
			return;
		}

		try {
			await websocket.call('CreateScene', { sceneName: sceneData.title });
			await createOBSSceneItems(sceneData);
		} catch (err) {
			console.error(err);
		}
	};

	/**
	 * Sends a request through OBS Websocket to create a new scene collection with all app scenes automatically generated.
	 * TODO: Create sources
	 * @param collectionName The name of the collection to create
	 */
	const createOBSSceneCollection = async (sceneCollectionName: string) => {
		if (!(websocket && connected)) {
			console.error('OBS Not Connected; Failed to create scene.');
			return;
		}

		try {
			// Create collection
			await websocket.call('CreateSceneCollection', {
				sceneCollectionName
			});
			// Create scene list
			for (const scene of sceneState) {
				await createOBSScene(scene);
			}
			// Remove default scene item
			try {
				await websocket.call('RemoveScene', { sceneName: 'Scene' });
			} catch (err) {
				console.log('No default scene found');
			}
		} catch (err) {
			console.error(err);
		}
	};

	/**
	 * Checks if a scene exists in the scene collection.
	 * If yes, will delete all relevant scene items (if they exist) and recreate them.
	 * If not, will create the scene.
	 * @param scene The scene to create
	 */
	const repairOBSScene = async (sceneData: SceneData) => {
		if (!(websocket && connected)) {
			console.error('OBS Not Connected; Failed to repair scene.');
			return;
		}

		// Check if scene exists in current collection
		const { scenes } = await websocket.call('GetSceneList');
		if (!scenes.some((scene) => scene.sceneName === sceneData.title)) {
			// Create the scene
			await createOBSScene(sceneData);
		} else {
			// Update the scene items
			const { sceneItems } = await websocket.call('GetSceneItemList', {
				sceneName: sceneData.title
			});

			for (const source of [...(sceneData.peripheralSources ?? []), sceneData.source]) {
				console.log(sceneItems);
				if (sceneItems.some((item) => item.sourceName === source.sourceName)) {
					// Update existing scene inputs
					await setBrowserSourceSettings(source);
				} else {
					// Create missing scene inputs
					await createBrowserSource(sceneData.title, source);
				}
			}
		}
	};

	/**
	 * Disconnects from the
	 */
	const disconnect = async () => {
		websocket?.disconnect();
		setConnected(false);
		dispatchToast(<MessageToast title="Disconnected From OBS Websocket" />, {
			intent: 'info'
		});
	};

	const OBSWebSocketData: OBSWebSocketClientState = {
		address: address,
		port: port,
		obs: websocket,
		connected: websocket !== null && connected,
		connect: connect,
		disconnect: disconnect,
		switchCurrentSceneProgram,
		createOBSScene,
		createOBSSceneCollection,
		repairOBSScene
	};

	return (
		<OBSWebSocketClientContext.Provider value={OBSWebSocketData}>
			{children}
		</OBSWebSocketClientContext.Provider>
	);
};

export default OBSWebSocketClientProvider;
