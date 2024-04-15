import { makeStyles, shorthands } from '@fluentui/react-components';
import Actionbar from './components/actionbar/Actionbar';
import Footer from './components/footer/Footer';
import AppRouter from './AppRouter';
import useGlobalMatches from '@hooks/useGlobalMatches';
import useEntrants from '@hooks/useEntrants';
import useSlippi from '@hooks/useSlippi';
import { useEffect } from 'react';
import { AppState } from '@redux/reducers/rootReducer';
import { useSelector } from 'react-redux';

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

	const { autoRefresh, tournamentSlug, eventSlug, validated } = useSelector(
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
	const { loading, error, refreshGlobalMatches, updateGlobalMatchState } = useGlobalMatches();

	/**
	 * Handle updating global match loading and error state
	 */
	useEffect(() => {
		updateGlobalMatchState();
	}, [loading, error]);

	/**
	 * Handle auto refresh, or load matches on app load.
	 */
	useEffect(() => {
		if (validated) {
			if (autoRefresh) {
				refreshGlobalMatches();
				const interval = setInterval(() => {
					refreshGlobalMatches();
				}, 60 * 1000);
				return () => {
					clearInterval(interval);
				};
			} else {
				refreshGlobalMatches();
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
