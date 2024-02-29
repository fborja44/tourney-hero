import { GameplayData } from '@common/interfaces/Data';
import { Switch, makeStyles, tokens } from '@fluentui/react-components';
import { BotSparkle20Filled } from '@fluentui/react-icons';
import PanelMessageBar from '@renderer/components/panel/PanelMessageBar';
import { setAutoUpdateScore } from '@renderer/redux/actions/slippiActions';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { getSlippiCharacter, getSlippiPort } from '@renderer/utils/slippi';
import { characterToString } from '@renderer/utils/string';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
	portErrorMessage: {
		display: 'inline'
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
	const dispatch = useDispatch();

	const gameplayData: GameplayData = useSelector((state: AppState) => state.dataState.gameplay);

	const { connected, activeGame, autoUpdateScore } = useSelector(
		(state: AppState) => state.slippiState
	);

	// If game automation is enabled, check if the ports + characters match
	// Sheik = Zelda

	const checkGamePorts = () => {
		const { player1, player2 } = gameplayData;
		const slippi1 = activeGame?.players[0];
		const slippi2 = activeGame?.players[1];
		const slippiPort1 = getSlippiPort(slippi1?.port ?? 0);
		const slippiPort2 = getSlippiPort(slippi2?.port ?? 0);
		const slippiCharacter1 = getSlippiCharacter(slippi1?.characterId ?? -1);
		const slippiCharacter2 = getSlippiCharacter(slippi2?.characterId ?? -1);

		if (slippiPort1 === player1.port && slippiCharacter1 === player1.character) {
			if (slippiPort2 === player2.port && slippiCharacter2 === player2.character) {
				return true;
			}
			// Could not find match for slippi port 2
			return [{ port: slippi2?.port ?? 0, character: slippiCharacter2 }];
		} else if (slippiPort1 === player2.port && slippiCharacter1 === player2.character) {
			if (slippiPort2 === player1.port && slippiCharacter2 === player1.character) {
				return true;
			}
			// Could not find match for slippi port 1
			return [{ port: slippiPort1, character: slippiCharacter1 }];
		} else if (slippiPort2 === player1.port && slippiCharacter2 === player1.character) {
			if (slippiPort1 === player2.port && slippiCharacter1 === player2.character) {
				return true;
			}
			// Could not find match for slippi port 2
			return [{ port: slippi1?.port ?? 0, character: slippiCharacter1 }];
		} else if (slippiPort2 === player2.port && slippiCharacter2 === player2.character) {
			if (slippiPort1 === player1.port && slippiCharacter1 === player1.character) {
				return true;
			}
			// Could not find match for slippi port 1
			return [{ port: slippi1?.port, character: slippiCharacter1 }];
		}
		return [
			{ port: slippi1?.port ?? 0, character: slippiCharacter1 },
			{ port: slippi2?.port ?? 0, character: slippiCharacter2 }
		];
	};

	const validGame = checkGamePorts();

	const Actions = (
		<>
			<Switch
				label="Automate Score"
				onChange={(ev) => {
					dispatch(setAutoUpdateScore(ev.target.checked));
				}}
			/>
		</>
	);

	// Slippi Not Connected
	if (!connected) {
		return null;
	}

	// Auto-Update Not Enabled
	// TODO: If auto-update not enabled, and proper ports are detected, alert user
	if (!autoUpdateScore) {
		return (
			<PanelMessageBar
				icon={<BotSparkle20Filled />}
				title="Slippi Automation"
				actions={Actions}
			>
				Score Updater Disabled
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
				Invalid Match - Must Be 1 vs 1
			</PanelMessageBar>
		);
	}

	// Ports Do Not Match
	if (activeGame && validGame !== true) {
		return (
			<PanelMessageBar
				icon={<BotSparkle20Filled />}
				title="Slippi Automation"
				actions={Actions}
				intent="warning"
			>
				Game score will not be updated. Could not match the following in-game ports:
				{validGame.map((player) => {
					return (
						<span className={classes.portError} key={player.port}>
							{`Port ${player.port}`}{' '}
							<span>{`(${characterToString(player.character)})`}</span>
						</span>
					);
				})}
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
