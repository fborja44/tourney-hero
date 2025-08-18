import { useContext, useState } from 'react';
import MenuTextField from '../../form/inputs/MenuTextField';
import { Button } from '@fluentui/react-components';
import { OBSWebSocketClientContext } from '../../../obs/OBSWebsocketProvider';
import ActionMenuStyles from '../styles/ActionMenuStyles';
import ActionMenu from '../ActionMenu';

const OBSMenu = () => {
	const classes = ActionMenuStyles();

	const {
		address: currentAddress,
		port: currentPort,
		connect,
		disconnect,
		connected
	} = useContext(OBSWebSocketClientContext);

	const [address, setAddress] = useState(currentAddress);
	const [port, setPort] = useState(currentPort);
	const [password, setPassword] = useState(import.meta.env.VITE_OBS_WEBSOCKET_PASSWORD || '');

	const handleConnect = async () => {
		if (connect) {
			const result = await connect(address, port, password);
			if (result) {
				setPassword('');
			}
		}
	};

	return (
		<ActionMenu title="OBS Configuration">
			<MenuTextField
				label="IP Address"
				value={address}
				placeholder="ex. ws://127.0.0.1 or wss://127.0.0.1"
				size="small"
				handleChange={(_ev, data) => {
					setAddress(data.value);
				}}
				disabled={connected}
			/>
			<MenuTextField
				label="Port"
				value={port}
				placeholder="ex. 4455"
				size="small"
				handleChange={(_ev, data) => {
					setPort(data.value);
				}}
				disabled={connected}
			/>
			{!connected && (
				<MenuTextField
					label="Websocket Password"
					value={password}
					placeholder="Enter your websocket password"
					size="small"
					type="password"
					handleChange={(_ev, data) => {
						setPassword(data.value);
					}}
				/>
			)}
			<div className={classes.buttonsContainer}>
				{!connected && (
					<Button
						size="small"
						appearance="primary"
						onClick={handleConnect}
						iconPosition="after"
						disabled={!connect}
					>
						Connect
					</Button>
				)}
				{connected && (
					<Button
						size="small"
						appearance="primary"
						onClick={() => {
							if (disconnect) {
								disconnect();
							}
						}}
						iconPosition="after"
						disabled={!disconnect}
					>
						Disconnect
					</Button>
				)}
			</div>
		</ActionMenu>
	);
};

export default OBSMenu;
