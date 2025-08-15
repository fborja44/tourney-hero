import { Button, Dialog, DialogTrigger, makeStyles, tokens } from '@fluentui/react-components';
import { BotSparkle20Filled, Settings20Regular } from '@fluentui/react-icons';
import SlippiSettingsDialog from '@renderer/components/dialogs/slippi/SlippiSettingsDialog';
import PanelMessageBar from '@renderer/components/panel/PanelMessageBar';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { SocketClientContext } from '@renderer/socket/SocketClientProvider';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

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

const SlippiMessageBar = () => {
	const classes = useStyles();

	const { connected, activeGame, automate, autoUpdateScore, autoUpdateCharacters, invalidPorts } =
		useSelector((state: AppState) => state.slippiState);

	const { connected: connectedToServer } = useContext(SocketClientContext);

	// If game automation is enabled, check if the ports + characters match
	// Sheik = Zelda

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
	if (activeGame && invalidPorts.length > 0) {
		return (
			<PanelMessageBar
				icon={<BotSparkle20Filled />}
				title="Slippi Automation"
				actions={Actions}
				intent="warning"
				className={classes.portErrorMessage}
			>
				<span>Could not match the following in-game ports:</span>
				<div className={classes.portErrorContainer}>
					{invalidPorts.map((player) => {
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
