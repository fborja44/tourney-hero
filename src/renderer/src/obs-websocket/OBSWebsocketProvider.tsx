import { createContext, useState } from 'react';
import OBSWebSocket from 'obs-websocket-js';
import { useDispatch } from 'react-redux';
import { setCurrentOBSScene, setOBSScenesList } from '../redux/actions/obsActions';

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
}

const defaultAddress = 'ws://127.0.0.1';
const defaultPort = '4455';

export const OBSWebSocketClientContext = createContext<OBSWebSocketClientState>({
	address: defaultAddress,
	port: defaultPort,
	obs: null,
	connected: false,
	connect: undefined,
	disconnect: undefined
});

/**
 * OBS Websocket Client setup
 */
const OBSWebSocketClientProvider = ({ children }: OBSWebSocketProviderProps) => {
	const dispatch = useDispatch();

	const [websocket, setWebSocket] = useState<OBSWebSocket | null>(null);
	const [connected, setConnected] = useState<boolean>(false);
	const [address, setAddress] = useState<string>(defaultAddress);
	const [port, setPort] = useState<string>(defaultPort);

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
			const result = await obs.connect(`${address}:${port}`, password);
			console.log('Connected to OBS');
			console.log(result);

			// Get current scene list
			const sceneData = await obs.call('GetSceneList');
			console.log(sceneData);
			dispatch(setOBSScenesList(sceneData.scenes));
			dispatch(setCurrentOBSScene(sceneData.currentProgramSceneName));

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
	 * Disconnects from the
	 */
	const disconnect = async () => {
		websocket?.disconnect();
		setConnected(false);
	};

	const OBSWebSocketData: OBSWebSocketClientState = {
		address: address,
		port: port,
		obs: websocket,
		connected: websocket !== null && connected,
		connect: connect,
		disconnect: disconnect
	};

	return (
		<OBSWebSocketClientContext.Provider value={OBSWebSocketData}>
			{children}
		</OBSWebSocketClientContext.Provider>
	);
};

export default OBSWebSocketClientProvider;
