import { makeStyles, shorthands } from '@fluentui/react-components';
import Actionbar from './components/actionbar/Actionbar';
import Navbar from './components/navbar/Navbar';
import { Scene } from './interfaces/Types';
import { AppState } from './redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import Footer from './components/footer/Footer';

const useStyles = makeStyles({
	appContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
		maxWidth: '100vw',
		maxHeight: '100vh',
		...shorthands.overflow('hidden')
	},
	mainContainer: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row'
	},
	main: {
		display: 'flex',
		flexDirection: 'column',
		boxSizing: 'border-box',
		flexGrow: 1,
		...shorthands.overflow('hidden', 'auto')
	}
});

function App(): JSX.Element {
	// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

	const classes = useStyles();

	/**
	 * Scenes State
	 */
	const scenes: Scene[] = useSelector((state: AppState) => state.scenesState);

	return (
		<div className={classes.appContainer}>
			<Actionbar />
			<div className={classes.mainContainer}>
				<Navbar scenes={scenes} />
			</div>
			<Footer />
		</div>
	);
}

export default App;
