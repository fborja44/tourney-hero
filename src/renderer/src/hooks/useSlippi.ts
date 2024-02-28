import { OBSWebSocketClientContext } from '@renderer/obs-websocket/OBSWebsocketProvider';
import { setGameActive } from '@renderer/redux/actions/slippiActions';
import { AppState } from '@renderer/redux/reducers/rootReducer';
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
		gameActive
	} = useSelector((state: AppState) => state.slippiState);

	const {
		obs,
		connected: OBSConnected,
		sendOBSSceneRequest
	} = useContext(OBSWebSocketClientContext);

	/**
	 * Autoswitcher
	 */

	const handleGameStart = async () => {
		console.log('Slippi: Game Started');
		// console.log(autoSwitchPlayersToGame, currentScene);
		dispatch(setGameActive(true));
		if (
			sendOBSSceneRequest &&
			slippiConnected &&
			autoSwitchPlayersToGame &&
			currentScene === 'Players'
		) {
			sendOBSSceneRequest('Gameplay');
		}
	};

	const handleGameEnd = async () => {
		console.log('Slippi: Game Ended');
		// console.log(autoSwitchGameToPlayers, currentScene);
		dispatch(setGameActive(false));
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

	return { connected: slippiConnected, gameActive };
};

export default useSlippi;
