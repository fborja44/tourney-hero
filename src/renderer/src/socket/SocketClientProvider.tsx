import { useToastController } from '@fluentui/react-components';
import { createContext, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import MessageToast from '../components/toasts/MessageToast';
import { AppState } from '@renderer/redux/reducers/rootReducer';
// import JoiOverlayData from '../validator/JoiOverlayData';

interface SocketClientProviderProps {
	children: React.ReactNode;
}

interface SocketClientState {
	address: string;
	socket: Socket | null;
	connected: boolean;
	connect: ((address: string, password: string) => boolean) | undefined;
	disconnect: (() => void) | undefined;
}

const DEFAULT_ADDRESS = 'http://127.0.0.1:3001';

export const SocketClientContext = createContext<SocketClientState>({
	address: DEFAULT_ADDRESS,
	socket: null,
	connected: false,
	connect: undefined,
	disconnect: undefined
});

/**
 * Socket.io setup
 * Initializes socket event listeners for communication
 * with the server
 */
const SocketClientProvider = ({ children }: SocketClientProviderProps) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [connected, setConnected] = useState<boolean>(false);
	const [address, setAddress] = useState<string>(DEFAULT_ADDRESS);

	const { dispatchToast } = useToastController('toaster');

	/**
	 * Connect to a socket.io server.
	 * @param address The server to connect to.
	 * @param password The server's authentication password
	 */
	const connect = (address: string, password: string): boolean => {
		try {
			// TODO: Validate address
			const socket = io(address, {
				auth: {
					password,
					perm: 'WRITE'
				}
			});
			setSocket(socket);
			setAddress(address);
			setConnected(socket.connected);

			// Event listeners
			socket.on('connected', () => {
				console.log('Connected to server.');
				setConnected(true);
			});

			socket.on('connect', () => {
				console.log('Connected to server.');
				dispatchToast(<MessageToast title="Connected To Server" />, {
					intent: 'success'
				});
				setConnected(true);
			});

			socket.on('reconnect', () => {
				console.log('Reconnected to server.');
				dispatchToast(<MessageToast title="Reconnected To Server" />, {
					intent: 'info'
				});
				setConnected(true);
			});

			socket.on('disconnect', () => {
				console.log('Disconnected from server.');
				dispatchToast(<MessageToast title="Disconnected From Server" />, {
					intent: 'warning'
				});
				socket.emit('disconnection');
				setConnected(false);
			});

			// Custom server events
			socket.on('updateState', (data: AppState) => {
				console.log('Recieved new server data: ', data);
				// TODO: Update app state
				// FIRST: Validate data
				// const result = JoiOverlayData.validate(data);
				// if (result.error) {
				// 	console.error('Recieved invalid data: ', result.error);
				// 	return;
				// }
			});

			socket.on('dataError', (message: string) => {
				console.error('Server error: ', message ?? 'Check server console');
				dispatchToast(<MessageToast title="Server Error" message={message} />, {
					intent: 'error'
				});
			});

			socket.on('success', () => {
				console.log('Data update successful');
				dispatchToast(<MessageToast title="Successfully Updated Data" />, {
					intent: 'success'
				});
			});

			return socket.connected;
		} catch (err) {
			console.error(err);
			setSocket(null);
			return false;
		}
	};

	const disconnect = () => {
		socket?.disconnect();
		setConnected(false);
	};

	const socketClientState: SocketClientState = {
		address: address,
		socket: socket,
		connected: connected,
		connect: connect,
		disconnect: disconnect
	};

	return (
		<SocketClientContext.Provider value={socketClientState}>
			{children}
		</SocketClientContext.Provider>
	);
};

export default SocketClientProvider;
