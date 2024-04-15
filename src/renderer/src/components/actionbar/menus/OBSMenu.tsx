import { useContext, useState } from 'react';
import MenuTextField from '../../form/inputs/MenuTextField';
import { shorthands, tokens, makeStyles, Button, Caption1 } from '@fluentui/react-components';
import { OBSWebSocketClientContext } from '../../../obs-websocket/OBSWebsocketProvider';

const useStyles = makeStyles({
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		...shorthands.margin(tokens.spacingVerticalM, 0, 0, 0),
		'& button': {
			...shorthands.margin(0, tokens.spacingHorizontalM, 0, 0)
		}
	},
	section: {
		...shorthands.margin(0, 0, tokens.spacingVerticalS, 0)
	},
	spacing: {
		marginBottom: tokens.spacingVerticalS
	}
});

const OBSMenu = () => {
	const classes = useStyles();

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
		<>
			<div>
				<Caption1>OBS Configuration</Caption1>
				<MenuTextField
					label="IP Address"
					value={address}
					placeholder="ex. ws://127.0.0.1 or wss://127.0.0.1"
					size="small"
					handleChange={(_ev, data) => {
						setAddress(data.value);
					}}
					className={classes.spacing}
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
					className={classes.spacing}
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
			</div>
		</>
	);
};

export default OBSMenu;
