import { AutomationData, DisplayData } from '@common/interfaces/Data';
import { SocketClientContext } from '@renderer/socket/SocketClientProvider';
import { useContext } from 'react';

const useSocket = () => {
	const { socket, connected } = useContext(SocketClientContext);

	/**
	 * Function to send data to the server through socket.io
	 * @param event The event name
	 * @param data The overlay data to send
	 * @returns The socket respond data, or null.
	 */
	const sendSocketData = (event: string, data: DisplayData | AutomationData) => {
		if (!connected) return null;
		const result = socket?.emit(event, data);
		console.log(result ? `Event: ${event}` : 'Transmission failed');
		return result;
	};

	return { socket, connected, sendSocketData };
};

export default useSocket;
