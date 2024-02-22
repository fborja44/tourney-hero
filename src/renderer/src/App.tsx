import { makeStyles, shorthands } from '@fluentui/react-components';
import Actionbar from './components/actionbar/Actionbar';
import Footer from './components/footer/Footer';
import AppRouter from './AppRouter';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './redux/reducers/rootReducer';
import useEventMatches from './hooks/useEventMatches';
import { setMatches } from './redux/actions/tournamentActions';
import { OBSWebSocketClientContext } from './obs-websocket/OBSWebsocketProvider';

const useStyles = makeStyles({
	appContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
		maxWidth: '100vw',
		maxHeight: '100vh',
		...shorthands.overflow('hidden')
	}
});

function App(): JSX.Element {
	const classes = useStyles();
	const dispatch = useDispatch();

	const ipcRenderer = window.electron.ipcRenderer;

	// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

	const { validated, eventSlug, tournamentSlug, autoRefresh } = useSelector(
		(state: AppState) => state.tournamentState
	);

	const { currentScene } = useSelector((state: AppState) => state.obsState);

	const {
		autoSwitchGameToPlayers,
		autoSwitchPlayersToGame,
		connected: slippiConnected
	} = useSelector((state: AppState) => state.slippiState);

	const {
		obs,
		connected: OBSConnected,
		sendOBSSceneRequest
	} = useContext(OBSWebSocketClientContext);

	/**
	 * Matches hook
	 */
	const { fetchMatches } = useEventMatches();

	/**
	 * Async fetch match helper function
	 */
	const fetchMatchData = async () => {
		const matches = await fetchMatches();
		dispatch(setMatches(matches));
	};

	/**
	 * Fetch matches when tournament is set
	 */
	useEffect(() => {
		if (validated) {
			if (autoRefresh) {
				fetchMatchData();
				const interval = setInterval(() => {
					fetchMatchData();
				}, 60 * 1000);
				return () => {
					clearInterval(interval);
				};
			} else {
				fetchMatchData();
			}
		}
		return;
	}, [validated, eventSlug, tournamentSlug, autoRefresh]);

	/**
	 * Autoswitcher
	 */

	const handleGameStart = async () => {
		console.log('Slippi: Game Started');
		console.log(autoSwitchPlayersToGame, currentScene);
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
		console.log(autoSwitchGameToPlayers, currentScene);
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
		if (slippiConnected && OBSConnected) {
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

	return (
		<div className={classes.appContainer}>
			<Actionbar />
			<AppRouter />
			<Footer />
		</div>
	);
}

export default App;
