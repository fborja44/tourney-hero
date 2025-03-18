import { useToastController } from '@fluentui/react-components';
import MessageToast from '../components/toasts/MessageToast';
import { OBSWebSocketClientContext } from '@renderer/obs/OBSWebsocketProvider';
import { incrementScore, updatePlayer } from '@renderer/redux/actions/dataActions';
import { setActiveGame } from '@renderer/redux/actions/slippiActions';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { getWinnerPort } from '@common/constants/slippi-utils';
import { GameEndType, GameStartType } from '@slippi/slippi-js';
import { IpcRendererEvent } from 'electron';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSocket from './useSocket';

const useSlippi = () => {
	const dispatch = useDispatch();
	const { dispatchToast } = useToastController('toaster');
	const ipcRenderer = window.electron.ipcRenderer;

	const { player1, player2 } = useSelector((state: AppState) => state.dataState.gameplay);

	const { currentScene } = useSelector((state: AppState) => state.obsState);

	const { connected, sendData } = useSocket();

	const {
		autoSwitchGameToPlayers,
		autoSwitchPlayersToGame,
		connected: slippiConnected,
		activeGame,
		automate,
		autoUpdateScore,
		autoUpdateCharacters,
		portsValid
	} = useSelector((state: AppState) => state.slippiState);

	const {
		obs,
		connected: OBSConnected,
		switchCurrentSceneProgram
	} = useContext(OBSWebSocketClientContext);

	/**
	 * Auto-switcher
	 */

	const handleGameStart = async (_ev: IpcRendererEvent, game: GameStartType) => {
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
				sendData('updateCharacters', {
					p1characterId: character1,
					p2characterId: character2
				});
				// Update app state
				dispatch(updatePlayer('player1', { characterId: character1 }));
				dispatch(updatePlayer('player2', { characterId: character2 }));
			}
		}
	};

	const handleGameEnd = async (_ev: IpcRendererEvent, game: GameEndType) => {
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
		if (game.gameEndMethod === 2) {
			// gameEndMethod = 2 means proper game end (i.e. not a quit out)
			// Generate winner
			const winnerPort = getWinnerPort(game.placements);

			// Match winner to player
			const winner =
				winnerPort === player1.port ? '1' : winnerPort === player2.port ? '2' : null;
			console.log(`Winner: ${winner}`);

			if (automate && autoUpdateScore && portsValid && connected && winner !== null) {
				console.log('Updating scores...');
				const p1score = player1.score;
				const p2score = player2.score;
				// Emit socket event
				sendData('updateScores', {
					p1score: winner == '1' ? (p1score ?? 0) + 1 : p1score,
					p2score: winner == '2' ? (p2score ?? 0) + 1 : p2score
				});
				// Update app state
				dispatch(incrementScore(`player${winner}`));
				dispatchToast(<MessageToast title={`Updated Score For Player ${winner}`} />, {
					intent: 'success'
				});
			}
		}

		// Set current active game to null
		dispatch(setActiveGame(null));
	};

	useEffect(() => {
		if (slippiConnected) {
			ipcRenderer.on('game-start', handleGameStart);
			ipcRenderer.on('game-end', handleGameEnd);
		} else {
			ipcRenderer.removeAllListeners('game-start');
			ipcRenderer.removeAllListeners('game-end');
		}

		return () => {
			ipcRenderer.removeAllListeners('game-start');
			ipcRenderer.removeAllListeners('game-end');
		};
	}, [
		autoSwitchGameToPlayers,
		autoSwitchPlayersToGame,
		currentScene,
		slippiConnected,
		obs,
		OBSConnected,
		portsValid,
		activeGame,
		automate,
		autoUpdateCharacters,
		autoUpdateScore
	]);

	return { connected: slippiConnected, activeGame };
};

export default useSlippi;
