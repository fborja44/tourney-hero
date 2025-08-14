import { makeStyles, shorthands } from '@fluentui/react-components';
import Actionbar from './components/actionbar/Actionbar';
import Footer from './components/footer/Footer';
import AppRouter from './AppRouter';
import useEntrants from '@hooks/startgg/useEntrants';
import useSlippi from '@hooks/controls/useSlippi';
import useMatchRefresh from './hooks/startgg/useMatchRefresh';

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

	/**
	 * Slippi hook
	 */
	useSlippi();

	/**
	 * Entrants hook
	 */
	useEntrants();

	/**
	 * Match refresh hook
	 */
	useMatchRefresh();

	return (
		<div className={classes.appContainer}>
			<Actionbar />
			<AppRouter />
			<Footer />
		</div>
	);
}

export default App;
