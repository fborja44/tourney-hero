import { useContext, useEffect, useState } from 'react';

import { Button, Caption1, Switch, useToastController } from '@fluentui/react-components';
import { OBSWebSocketClientContext } from '../../../obs/OBSWebsocketProvider';
import { useDispatch, useSelector } from 'react-redux';
import {
	setActiveGame,
	setAutoSwitchGameToPlayers,
	setAutoSwitchPlayersToGame,
	setRelayPort,
	setSlippiConnected
} from '@redux/actions/slippiActions';
import { setReplayDirectory, setReplayList } from '@redux/actions/replaysActions';
import { AppState } from '@redux/reducers/rootReducer';
import MessageToast from '../../toasts/MessageToast';
import MenuTextField from '../../form/inputs/MenuTextField';
import { isInteger } from '@utils/string';
import ActionMenu, { ActionMenuSection } from '../ActionMenu';
import ActionMenuStyles from '../styles/ActionMenuStyles';

const SlippiMenu = () => {
	const classes = ActionMenuStyles();
	const dispatch = useDispatch();
	const ipcRenderer = window.electron.ipcRenderer;

	const { dispatchToast } = useToastController('toaster');

	const { connected: OBSConnected } = useContext(OBSWebSocketClientContext);

	const { autoSwitchGameToPlayers, autoSwitchPlayersToGame, connected, relayPort } = useSelector(
		(state: AppState) => state.slippiState
	);

	const { replayDir } = useSelector((state: AppState) => state.replayState);

	const [relay, setRelay] = useState<number>(relayPort);
	const [loading, setLoading] = useState<boolean>(false);

	const handleRelayConnect = () => {
		ipcRenderer.invoke('slippi:connect', relay);
		setLoading(true);
	};

	const handleRelayDisconnect = () => {
		ipcRenderer.invoke('slippi:disconnect', relay);
		setLoading(true);
	};

	const handleConnected = () => {
		console.log('Connected to Slippi');
		dispatch(setSlippiConnected(true));
		dispatch(setRelayPort(relay));
		dispatchToast(<MessageToast title="Connected To Slippi Relay" />, {
			intent: 'success'
		});
		setLoading(false);
		return;
	};

	const handleReconnected = () => {
		console.log('Reconnected to Slippi');
		dispatch(setSlippiConnected(true));
		dispatchToast(<MessageToast title="Reconnected To Slippi Relay" />, {
			intent: 'success'
		});
		setLoading(false);
		return;
	};

	const handleDisconnected = () => {
		// ipcRenderer.send('close-relay');
		dispatchToast(<MessageToast title="Disconnected From Slippi Relay" />, {
			intent: 'info'
		});
		dispatch(setSlippiConnected(false));
		dispatch(setActiveGame(null));
		setLoading(false);
		return;
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleRelayConnectError = (err: any) => {
		console.error(err);
		dispatchToast(
			<MessageToast title="Slippi Relay Error" message={err?.message ?? undefined} />,
			{
				intent: 'error'
			}
		);
		setLoading(false);
		dispatch(setSlippiConnected(false));
		return;
	};

	const handleDirSelect = async () => {
		const { replayDir: path, replayData } = await window.api.getReplayDir();
		dispatch(setReplayDirectory(path));
		dispatch(setReplayList(replayData));
	};

	useEffect(() => {
		ipcRenderer.on('relay-connected', handleConnected);
		ipcRenderer.on('relay-disconnected', handleDisconnected);
		ipcRenderer.on('relay-reconnected', handleReconnected);
		ipcRenderer.on('relay-error', handleRelayConnectError);

		return () => {
			ipcRenderer.removeAllListeners('relay-connected');
			ipcRenderer.removeAllListeners('relay-disconnected');
			ipcRenderer.removeAllListeners('relay-reconnected');
			ipcRenderer.removeAllListeners('relay-error');
		};
	}, [connected]);

	return (
		<>
			<ActionMenu title="Slippi Configuration">
				<ActionMenuSection>
					<MenuTextField
						label="Slippi Relay Port"
						value={relay.toString()}
						placeholder="ex. 1667"
						handleChange={(_ev, data) => {
							if (!isInteger(data.value)) return;
							setRelay(parseInt(data.value));
						}}
						disabled={connected}
					/>
				</ActionMenuSection>
				{!connected && (
					<div className={classes.buttonsContainer}>
						<Button
							size="small"
							appearance="primary"
							onClick={handleRelayConnect}
							iconPosition="after"
							disabled={loading}
						>
							Connect to Slippi
						</Button>
					</div>
				)}
				{connected && (
					<ActionMenuSection
						label="OBS Scene Auto-Switcher"
						tooltipText="Automatically switch between the Gameplay and Player Camera
										scenes. This will only occur when either of the scenes are
										active."
					>
						{!OBSConnected && (
							<Caption1 className={classes.disabled}>
								OBS Websocket Disconnected
							</Caption1>
						)}
						<div className={classes.switchContainer}>
							<Switch
								checked={autoSwitchGameToPlayers}
								onChange={(_ev, data) =>
									dispatch(setAutoSwitchGameToPlayers(data.checked))
								}
								disabled={!OBSConnected || !connected}
							/>
							<Caption1>Gameplay Scene → Players Scene</Caption1>{' '}
							{/* TODO: Make own component + accessibility labels */}
						</div>
						<div className={classes.switchContainer}>
							<Switch
								checked={autoSwitchPlayersToGame}
								onChange={(_ev, data) =>
									dispatch(setAutoSwitchPlayersToGame(data.checked))
								}
								disabled={!OBSConnected || !connected}
							/>
							<Caption1>Players Scene → Gameplay Scene</Caption1>
						</div>
						<div className={classes.buttonsContainer}>
							<Button
								size="small"
								iconPosition="after"
								onClick={handleRelayDisconnect}
							>
								Disconnect
							</Button>
						</div>
					</ActionMenuSection>
				)}
			</ActionMenu>
			<ActionMenu title="Slippi Replays">
				<MenuTextField
					label="Slippi Replay Directory"
					value={replayDir}
					placeholder="Select Your Replay Directory"
					disabled
				/>
				<div className={classes.buttonsContainer}>
					<Button size="small" appearance="primary" onClick={handleDirSelect}>
						Select Directory
					</Button>
					{/* {replayDir && (
						<Caption1 className={classes.caption}>
							Found {replayList.length} file(s).
						</Caption1>
					)} */}
				</div>
			</ActionMenu>
		</>
	);
};

export default SlippiMenu;
