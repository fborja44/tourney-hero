import { makeStyles, shorthands } from '@fluentui/react-components';
import Actionbar from './components/actionbar/Actionbar';
import Footer from './components/footer/Footer';
import AppRouter from './AppRouter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './redux/reducers/rootReducer';
import useEventMatches from './hooks/useEventMatches';
import { setMatches } from './redux/actions/tournamentActions';

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

	// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

	const { validated, eventSlug, tournamentSlug, autoRefresh } = useSelector(
		(state: AppState) => state.tournamentState
	);

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

	return (
		<div className={classes.appContainer}>
			<Actionbar />
			<AppRouter />
			<Footer />
		</div>
	);
}

export default App;
