import { makeStyles, shorthands } from '@fluentui/react-components';
import Actionbar from './components/actionbar/Actionbar';
import Footer from './components/footer/Footer';
import AppRouter from './AppRouter';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from './redux/reducers/rootReducer';
import useEventMatches from './hooks/useEventMatches';
import useEntrants from './hooks/useEntrants';
import useSlippi from './hooks/useSlippi';

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

	// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

	const { validated, eventSlug, tournamentSlug, autoRefresh } = useSelector(
		(state: AppState) => state.tournamentState
	);

	/**
	 * Entrants hook
	 */
	useSlippi();

	/**
	 * Entrants hook
	 */
	useEntrants();

	/**
	 * Matches hook
	 */
	const { refreshMatches } = useEventMatches();

	/**
	 * Fetch matches when tournament is set
	 */
	useEffect(() => {
		if (validated) {
			if (autoRefresh) {
				refreshMatches();
				const interval = setInterval(() => {
					refreshMatches();
				}, 60 * 1000);
				return () => {
					clearInterval(interval);
				};
			} else {
				refreshMatches();
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
