import { OBSWebSocketClientContext } from '@renderer/obs-websocket/OBSWebsocketProvider';
import { setActiveGame } from '@renderer/redux/actions/slippiActions';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { getSlippiCharacter, getWinnerPort } from '@renderer/utils/slippi';
import { GameEndType, GameStartType } from '@slippi/slippi-js';
import { IpcRendererEvent } from 'electron';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useSlippi = () => {
	const dispatch = useDispatch();

	const ipcRenderer = window.electron.ipcRenderer;

	const { currentScene } = useSelector((state: AppState) => state.obsState);

	const {
		autoSwitchGameToPlayers,
		autoSwitchPlayersToGame,
		connected: slippiConnected,
		activeGame
	} = useSelector((state: AppState) => state.slippiState);

	const {
		obs,
		connected: OBSConnected,
		sendOBSSceneRequest
	} = useContext(OBSWebSocketClientContext);

	/**
	 * Autoswitcher
	 */

	const handleGameStart = async (_ev: IpcRendererEvent, game: GameStartType) => {
		console.log('Slippi: Game Started');
		// console.log(autoSwitchPlayersToGame, currentScene);
		console.log(
			getSlippiCharacter(game.players[0]?.characterId ?? 0),
			`Port ${game.players[0]?.port}`,
			'vs',
			getSlippiCharacter(game.players[1]?.characterId ?? 0),
			`Port ${game.players[1]?.port}`
		);
		console.log(game);
		dispatch(setActiveGame(game));
		if (
			sendOBSSceneRequest &&
			slippiConnected &&
			autoSwitchPlayersToGame &&
			currentScene === 'Players'
		) {
			sendOBSSceneRequest('Gameplay');
		}
	};

	const handleGameEnd = async (_ev: IpcRendererEvent, game: GameEndType) => {
		console.log('Slippi: Game Ended');
		// console.log(autoSwitchGameToPlayers, currentScene);
		console.log(game);
		console.log('Winner:', getWinnerPort(game.placements));
		dispatch(setActiveGame(null));
		if (
			sendOBSSceneRequest &&
			slippiConnected &&
			autoSwitchGameToPlayers &&
			currentScene === 'Gameplay'
		) {
			sendOBSSceneRequest('Players');
		}
	};

	useEffect(() => {
		if (slippiConnected) {
			ipcRenderer.on('game-start', handleGameStart);
			ipcRenderer.on('game-end', handleGameEnd);
		} else {
			ipcRenderer.removeListener('game-start', handleGameStart);
			ipcRenderer.removeListener('game-end', handleGameEnd);
		}

		return () => {
			ipcRenderer.removeListener('game-start', handleGameStart);
			ipcRenderer.removeListener('game-end', handleGameEnd);
		};
	}, [
		autoSwitchGameToPlayers,
		autoSwitchPlayersToGame,
		currentScene,
		slippiConnected,
		obs,
		OBSConnected
	]);

	return { connected: slippiConnected, activeGame };
};

export default useSlippi;
