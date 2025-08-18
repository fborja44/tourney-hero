import { PlugConnected20Regular, PlugDisconnected20Regular } from '@fluentui/react-icons';
import ActionButton from '../ActionButton';
import { useContext } from 'react';
import { OBSWebSocketClientContext } from '@renderer/obs/OBSWebsocketProvider';
import OBSMenu from './OBSMenu';

const OBSActionButton = () => {
	const { connected } = useContext(OBSWebSocketClientContext);

	return (
		<ActionButton
			icon={connected ? PlugConnected20Regular : PlugDisconnected20Regular}
			title="OBS Websocket"
			menu={<OBSMenu />}
		>
			{connected ? 'Connected to OBS' : 'Not Configured'}
		</ActionButton>
	);
};

export default OBSActionButton;
