import { useContext, useEffect, useState } from 'react';

import {
	shorthands,
	tokens,
	makeStyles,
	Button,
	Caption1,
	Switch,
	Popover,
	PopoverTrigger,
	PopoverSurface,
	useToastController
} from '@fluentui/react-components';
import { QuestionCircleRegular } from '@fluentui/react-icons';
import { OBSWebSocketClientContext } from '../../../obs-websocket/OBSWebsocketProvider';
import { useDispatch, useSelector } from 'react-redux';
import {
	setAutoSwitchGameToPlayers,
	setAutoSwitchPlayersToGame,
	setRelayPort,
	setReplayDirectory,
	setReplayList,
	setSlippiConnected
} from '@redux/actions/slippiActions';
import { AppState } from '@redux/reducers/rootReducer';
import MessageToast from '../../toasts/MessageToast';
import MenuTextField from '../../form/inputs/MenuTextField';
import { isInteger } from '@utils/string';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column'
	},
	label: {
		display: 'flex',
		alignItems: 'center',
		columnGap: tokens.spacingHorizontalXS,
		color: tokens.colorNeutralForeground3,
		marginTop: tokens.spacingVerticalMNudge
	},
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		...shorthands.margin(tokens.spacingVerticalS, 0, 0, 0),
		'& button': {
			...shorthands.margin(0, tokens.spacingHorizontalM, 0, 0)
		}
	},
	input: {
		display: 'none'
	},
	inputButton: {
		width: 'fit-content',
		...shorthands.margin(tokens.spacingVerticalXS, 0),
		'&:hover': {
			cursor: 'pointer'
		},
		'& label:hover': {
			cursor: 'pointer'
		}
	},
	pathDisplay: {
		display: 'flex',
		flexDirection: 'column',
		textWrap: 'wrap',
		textOverflow: 'ellipsis',
		...shorthands.overflow('clip'),
		marginBottom: tokens.spacingVerticalXXS
	},
	switchContainer: {
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		right: '8px'
	},
	info: {
		cursor: 'pointer'
	},
	popover: {
		...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),
		maxWidth: '450px',
		textAlign: 'center'
	},
	disabled: {
		color: tokens.colorPaletteRedForeground2,
		fontStyle: 'italic'
	},
	portField: {
		marginBottom: tokens.spacingVerticalXS
	},
	caption: {
		fontStyle: 'italic',
		color: tokens.colorNeutralForeground3
	}
});

const SlippiMenu = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const ipcRenderer = window.electron.ipcRenderer;

	const { dispatchToast } = useToastController('toaster');

	const { connected: OBSConnected } = useContext(OBSWebSocketClientContext);

	const {
		autoSwitchGameToPlayers,
		autoSwitchPlayersToGame,
		connected,
		relayPort,
		replayDir,
		replayList
	} = useSelector((state: AppState) => state.slippiState);

	const [relay, setRelay] = useState<number>(relayPort);
	const [loading, setLoading] = useState<boolean>(false);

	const handleRelay = () => {
		ipcRenderer.invoke('slippi:connect', relay);
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

	const handleDisconnect = () => {
		// ipcRenderer.send('close-relay');
		dispatchToast(<MessageToast title="Disconnected From Slippi Relay" />, {
			intent: 'info'
		});
		dispatch(setSlippiConnected(false));
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleRelayError = (err: any) => {
		console.error(err);
		dispatchToast(
			<MessageToast title="Slippi Relay Error" message={err?.message ?? undefined} />,
			{
				intent: 'error'
			}
		);
		setLoading(false);
		dispatch(setSlippiConnected(false));
	};

	const handleDirSelect = async () => {
		const { replayDir: path, replayData } = await window.api.getReplayDir();
		dispatch(setReplayDirectory(path));
		dispatch(setReplayList(replayData));
	};

	useEffect(() => {
		ipcRenderer.on('relay-connected', handleConnected);
		ipcRenderer.on('relay-error', handleRelayError);
		return () => {
			ipcRenderer.removeListener('relay-connected', handleConnected);
			ipcRenderer.removeListener('relay-error', handleRelayError);
		};
	}, [connected]);

	return (
		<>
			<div className={classes.container}>
				<Caption1>Slippi Configuration</Caption1>
				<MenuTextField
					label="Slippi Relay Port"
					value={relay.toString()}
					placeholder="ex. 1667"
					handleChange={(_ev, data) => {
						if (!isInteger(data.value)) return;
						setRelay(parseInt(data.value));
					}}
					className={classes.portField}
					disabled={connected}
				/>
				{connected && (
					<div>
						<Caption1 className={classes.label}>
							<span>OBS Scene Auto-Switcher</span>{' '}
							<Popover withArrow mouseLeaveDelay={3} size="small">
								<PopoverTrigger disableButtonEnhancement>
									<QuestionCircleRegular className={classes.info} />
								</PopoverTrigger>
								<PopoverSurface className={classes.popover}>
									<Caption1>
										Automatically switch between the Gameplay and Player Camera
										scenes. This will only occur when either of the scenes are
										active.
									</Caption1>
								</PopoverSurface>
							</Popover>
						</Caption1>
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
							/>{' '}
							<Caption1>Gameplay Scene → Players Scene</Caption1>
						</div>
						<div className={classes.switchContainer}>
							<Switch
								checked={autoSwitchPlayersToGame}
								onChange={(_ev, data) =>
									dispatch(setAutoSwitchPlayersToGame(data.checked))
								}
								disabled={!OBSConnected || !connected}
							/>{' '}
							<Caption1>Players Scene → Gameplay Scene</Caption1>
						</div>
					</div>
				)}
				<div className={classes.buttonsContainer}>
					{connected ? (
						<Button
							size="small"
							iconPosition="after"
							onClick={() => {
								handleDisconnect();
							}}
						>
							Disconnect
						</Button>
					) : (
						<Button
							size="small"
							appearance="primary"
							onClick={handleRelay}
							iconPosition="after"
							disabled={loading}
						>
							Connect to Slippi
						</Button>
					)}
				</div>
			</div>
			<div className={classes.container}>
				<Caption1>Slippi Replays</Caption1>
				<MenuTextField
					label="Slippi Replay Directory"
					value={replayDir}
					placeholder="Select Your Replay Directory"
					className={classes.portField}
					disabled
				/>
				<div className={classes.buttonsContainer}>
					<Button size="small" appearance="primary" onClick={handleDirSelect}>
						Select Directory
					</Button>
					{replayDir && (
						<Caption1 className={classes.caption}>
							Found {replayList.length} file(s).
						</Caption1>
					)}
				</div>
			</div>
		</>
	);
};

export default SlippiMenu;
