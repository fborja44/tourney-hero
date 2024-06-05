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
import { Scene } from '@common/interfaces/Types';
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
	sendOBSSceneRequest: ((sceneName: string) => void) | undefined;
	createOBSScene: ((sceneName: string, scene: Scene) => void) | undefined;
	createOBSSceneCollection: ((sceneCollectionName: string) => void) | undefined;
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
	sendOBSSceneRequest: undefined,
	createOBSScene: undefined,
	createOBSSceneCollection: undefined
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
	const sendOBSSceneRequest = async (sceneName: string) => {
		try {
			if (websocket && connected) {
				await websocket.call('SetCurrentProgramScene', { sceneName });
			} else {
				console.error('OBS Not Connected; Failed to switch scene.');
			}
		} catch (err) {
			console.error(err);
		}
	};

	/**
	 *
	 * @param sceneName
	 * @param inputName
	 * @param inputKind
	 * @param inputSettings
	 */
	const createBrowserSource = async (
		sceneName: string,
		inputName: string,
		endpoint: string,
		width: number = 1920,
		height: number = 1080,
		shutdown: boolean = true
	) => {
		if (websocket && connected) {
			// Check if input exists in list
			const { inputs } = await websocket.call('GetInputList');
			if (inputs.some((input) => input.inputName === inputName)) {
				// Input already exists
				await websocket.call('CreateSceneItem', {
					sceneName,
					sourceName: inputName
				});
			} else {
				await websocket.call('CreateInput', {
					sceneName,
					inputName,
					inputKind: 'browser_source',
					inputSettings: {
						url: `http://localhost:${getPortFromAddress(serverAddress) ?? '3001'}${endpoint}`,
						width: width,
						height: height,
						shutdown: shutdown
					}
				});
			}
		} else {
			console.error('OBS Not Connected; Failed to create browser source.');
		}
	};

	/**
	 * Sends a request through OBS Websocket to create a new scene
	 * TODO: Create sources
	 * @param sceneName The name of the scene to create
	 */
	const createOBSScene = async (sceneName: string, scene?: Scene) => {
		try {
			if (websocket && connected) {
				await websocket.call('CreateScene', { sceneName });
				// Create peripheral sources first
				for (const source of scene?.peripheralSources ?? []) {
					await createBrowserSource(
						sceneName,
						source.sourceName,
						source.endpoint,
						source.width,
						source.height,
						source.shutdown
					);
				}
				if (scene) {
					// Create primary source
					await createBrowserSource(
						sceneName,
						`${scene.title} Browser Source`,
						scene.endpoint
					);
				}
			} else {
				console.error('OBS Not Connected; Failed to create scene.');
			}
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
		try {
			if (websocket && connected) {
				// Create collection
				await websocket.call('CreateSceneCollection', {
					sceneCollectionName
				});
				// Create scene list
				for (const scene of sceneState) {
					await createOBSScene(scene.title, scene);
				}
				// Remove default scene item
				try {
					await websocket.call('RemoveScene', { sceneName: 'Scene' });
				} catch (err) {
					console.log('No default scene found');
				}
			} else {
				console.error('OBS Not Connected; Failed to create scene.');
			}
		} catch (err) {
			console.error(err);
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
		sendOBSSceneRequest,
		createOBSScene,
		createOBSSceneCollection
	};

	return (
		<OBSWebSocketClientContext.Provider value={OBSWebSocketData}>
			{children}
		</OBSWebSocketClientContext.Provider>
	);
};

export default OBSWebSocketClientProvider;
