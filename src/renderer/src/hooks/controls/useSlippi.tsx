import { useToastController } from '@fluentui/react-components';
import MessageToast from '../../components/toasts/MessageToast';
import { OBSWebSocketClientContext } from '@renderer/obs/OBSWebsocketProvider';
import { updatePlayer } from '@renderer/redux/actions/dataActions';
import { setActiveGame } from '@renderer/redux/actions/slippiActions';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { getWinnerPort } from '@common/constants/slippi-utils';
import { GameEndType, GameStartType } from '@slippi/slippi-js';
import { IpcRendererEvent } from 'electron';
import { useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSocket from './useSocket';
import useOverlayControls from './useOverlayControls';

const useSlippi = () => {
	const dispatch = useDispatch();
	const { dispatchToast } = useToastController('toaster');

	const gameplay = useSelector((state: AppState) => state.dataState.gameplay);

	const { player1, player2 } = gameplay;

	const { handlePlayerFieldChange } = useOverlayControls();

	const { currentScene } = useSelector((state: AppState) => state.obsState);

	const { connected: socketConnected, sendSocketData } = useSocket();

	const ipcRenderer = window.electron.ipcRenderer;

	const {
		autoSwitchGameToPlayers,
		autoSwitchPlayersToGame,
		connected: slippiConnected,
		automate,
		autoUpdateScore,
		autoUpdateCharacters,
		portsValid
	} = useSelector((state: AppState) => state.slippiState);

	const { switchCurrentSceneProgram } = useContext(OBSWebSocketClientContext);

	/**
	 * Auto-switcher
	 */

	const handleGameStart = useCallback(
		async (_ev: IpcRendererEvent, game: GameStartType) => {
			console.log('Slippi: Game Started');
			// console.log(autoSwitchPlayersToGame, currentScene);
			console.log(game);
			dispatch(setActiveGame(game));

			// Auto-switch
			if (
				switchCurrentSceneProgram &&
				slippiConnected &&
				autoSwitchPlayersToGame &&
				currentScene === 'Players'
			) {
				switchCurrentSceneProgram('Gameplay');
			}

			// Auto-update characters
			if (automate && autoUpdateCharacters && portsValid && game.players.length === 2) {
				const character1 = game.players[0].characterId ?? null,
					character2 = game.players[1].characterId ?? null;
				if (player1.characterId !== character1 || player2.characterId !== character2) {
					// Emit socket event
					sendSocketData('updateCharacters', {
						p1characterId: character1,
						p2characterId: character2
					});
					// Update app state
					dispatch(updatePlayer('player1', { characterId: character1 }));
					dispatch(updatePlayer('player2', { characterId: character2 }));
				}
			}
		},
		[
			switchCurrentSceneProgram,
			slippiConnected,
			autoSwitchPlayersToGame,
			currentScene,
			automate,
			autoUpdateCharacters,
			portsValid
		]
	);

	const handleGameEnd = useCallback(
		async (_ev: IpcRendererEvent, game: GameEndType) => {
			console.log('Slippi: Game Ended');
			// console.log(autoSwitchGameToPlayers, currentScene);

			// Auto-switch
			if (
				switchCurrentSceneProgram &&
				slippiConnected &&
				autoSwitchGameToPlayers &&
				currentScene === 'Gameplay'
			) {
				switchCurrentSceneProgram('Players');
			}

			// Auto-update score
			// ! Bug: Wrong player will update
			if (game.gameEndMethod === 2) {
				// gameEndMethod = 2 means proper game end (i.e. not a quit out)
				// Generate winner
				const winnerPort = getWinnerPort(game.placements);

				// Match winner to player
				const winner =
					winnerPort === player1.port ? '1' : winnerPort === player2.port ? '2' : null;
				console.log(`Winner: ${winner}`);

				const winnerScore = winner === '1' ? player1.score : player2.score;

				if (
					automate &&
					autoUpdateScore &&
					portsValid &&
					socketConnected &&
					winner !== null &&
					winnerScore !== null
				) {
					console.log('Updating scores...');

					const newScore = winnerScore + 1;

					// Emit socket event
					sendSocketData('updateScores', {
						p1score: winner == '1' ? newScore : player1.score,
						p2score: winner == '2' ? newScore : player2.score
					});
					// Update app state
					handlePlayerFieldChange(`player${winner}`, 'score', newScore);
					dispatchToast(<MessageToast title={`Updated Score For Player ${winner}`} />, {
						intent: 'success'
					});
				}
			}

			// Set current active game to null
			dispatch(setActiveGame(null));
		},
		[
			switchCurrentSceneProgram,
			slippiConnected,
			autoSwitchGameToPlayers,
			currentScene,
			automate,
			autoUpdateScore,
			portsValid,
			socketConnected,
			gameplay
		]
	);

	useEffect(() => {
		ipcRenderer.on('game-start', handleGameStart);
		ipcRenderer.on('game-end', handleGameEnd);

		return () => {
			ipcRenderer.removeAllListeners('game-start');
			ipcRenderer.removeAllListeners('game-end');
		};
	}, [handleGameStart, handleGameEnd]);
};

export default useSlippi;
