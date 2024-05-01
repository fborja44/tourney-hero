import { GameplayData } from '@common/interfaces/Data';
import { Button, Dialog, DialogTrigger, makeStyles, tokens } from '@fluentui/react-components';
import { BotSparkle20Filled, Settings20Regular } from '@fluentui/react-icons';
import SlippiSettingsDialog from '@renderer/components/dialogs/slippi/SlippiSettingsDialog';
import PanelMessageBar from '@renderer/components/panel/PanelMessageBar';
import { setPortsValid } from '@renderer/redux/actions/slippiActions';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { SocketClientContext } from '@renderer/socket/SocketClientProvider';
import { getSlippiPort } from '@common/constants/slippi-utils';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
	portErrorMessage: {
		paddingTop: tokens.spacingVerticalSNudge,
		paddingBottom: tokens.spacingVerticalSNudge
	},
	portErrorContainer: {
		marginBottom: tokens.spacingVerticalXXS
	},
	portError: {
		fontWeight: tokens.fontWeightSemibold,
		marginLeft: tokens.spacingHorizontalS,
		'& span': {
			fontStyle: 'italic',
			marginLeft: tokens.spacingHorizontalXS
		}
	}
});

interface InvalidPort {
	port: number;
}

const SlippiMessageBar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const gameplayData: GameplayData = useSelector((state: AppState) => state.dataState.gameplay);

	const { connected, activeGame, automate, autoUpdateScore, autoUpdateCharacters, portsValid } =
		useSelector((state: AppState) => state.slippiState);

	const { connected: connectedToServer } = useContext(SocketClientContext);

	const [validGame, setGameValid] = useState<InvalidPort[]>([]);

	// If game automation is enabled, check if the ports + characters match
	// Sheik = Zelda

	const checkGamePorts = (): InvalidPort[] => {
		const { player1, player2 } = gameplayData;
		const slippi1 = activeGame?.players[0],
			slippi2 = activeGame?.players[1];
		const slippiPort1 = getSlippiPort(slippi1?.port ?? 0),
			slippiPort2 = getSlippiPort(slippi2?.port ?? 0);

		if (
			(slippiPort1 === player1.port && slippiPort2 === player2.port) ||
			(slippiPort1 === player2.port && slippiPort2 === player1.port)
		) {
			return [];
		}

		const result: InvalidPort[] = [];

		if (slippiPort1 !== player1.port && slippiPort1 !== player2.port) {
			result.push({ port: slippi1?.port ?? -1 });
		}

		if (slippiPort2 !== player2.port && slippiPort2 !== player2.port) {
			result.push({ port: slippi2?.port ?? -2 });
		}

		return result;
	};

	useEffect(() => {
		if (activeGame !== null) {
			const portErrors = checkGamePorts();
			setGameValid(portErrors);
			dispatch(setPortsValid(portErrors.length === 0));
		}
	}, [autoUpdateScore, activeGame, gameplayData]);

	const Actions = (
		<>
			<Dialog>
				<DialogTrigger disableButtonEnhancement>
					<Button icon={<Settings20Regular />} appearance="transparent" />
				</DialogTrigger>
				<SlippiSettingsDialog />
			</Dialog>
		</>
	);

	// Slippi Not Connected
	if (!connected) {
		return null;
	}

	// Auto-Update Not Enabled
	// TODO: If auto-update not enabled, and proper ports are detected, alert user
	if (!automate || (!autoUpdateScore && !autoUpdateCharacters)) {
		return (
			<PanelMessageBar
				icon={<BotSparkle20Filled />}
				title="Slippi Automation"
				actions={Actions}
			>
				Disabled
			</PanelMessageBar>
		);
	}

	// Not Connected To Server
	if (!connectedToServer) {
		return (
			<PanelMessageBar
				icon={<BotSparkle20Filled />}
				title="Slippi Automation"
				intent="warning"
				actions={Actions}
			>
				Game score will not be updated. Not connected to server.
			</PanelMessageBar>
		);
	}

	// Game Not Active
	if (!activeGame) {
		return (
			<PanelMessageBar
				icon={<BotSparkle20Filled />}
				title="Slippi Automation"
				actions={Actions}
			>
				Waiting For Game...
			</PanelMessageBar>
		);
	}

	// Not Singles Match
	if (activeGame.players.length > 2) {
		return (
			<PanelMessageBar
				icon={<BotSparkle20Filled />}
				title="Slippi Automation"
				actions={Actions}
				intent="warning"
			>
				Unable To Automate - Must Be 1 vs 1
			</PanelMessageBar>
		);
	}

	// Ports Do Not Match
	if (activeGame && !portsValid && validGame.length > 0) {
		return (
			<PanelMessageBar
				icon={<BotSparkle20Filled />}
				title="Slippi Automation"
				actions={Actions}
				intent="warning"
				className={classes.portErrorMessage}
			>
				Could not match the following in-game ports:
				<div className={classes.portErrorContainer}>
					{validGame.map((player) => {
						return (
							<span className={classes.portError} key={`${player.port}-error`}>
								{`Port ${player.port}`}
							</span>
						);
					})}
				</div>
			</PanelMessageBar>
		);
	}

	// Ports Do Match
	return (
		<PanelMessageBar
			icon={<BotSparkle20Filled />}
			title="Slippi Automation"
			actions={Actions}
			intent="success"
		>
			Waiting For Match Result...
		</PanelMessageBar>
	);
};

export default SlippiMessageBar;
