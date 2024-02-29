import { Data, ScoreData } from '@common/interfaces/Data';
import { SocketClientContext } from '@renderer/socket/SocketClientProvider';
import { useContext } from 'react';

const useSocket = () => {
	const { socket, connected } = useContext(SocketClientContext);

	/**
	 * Function to send data to the server through socket.io
	 * @param event The event name
	 * @param data The overlay data to send
	 */
	const sendData = (event: string, data: Data | ScoreData) => {
		const result = socket?.emit(event, data);
		console.log(result ? `Event: ${event}` : 'Transmission failed');
	};

	return { socket, connected, sendData };
};

export default useSocket;
