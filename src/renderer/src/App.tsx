import { FluentProvider, makeStyles, shorthands, webDarkTheme } from '@fluentui/react-components';
import Actionbar from './components/actionbar/Actionbar';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

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

	return (
		<ReduxProvider store={store}>
			<FluentProvider theme={webDarkTheme}>
				<div className={classes.appContainer}>
					<div className={classes.mainContainer}>
						<Actionbar />
					</div>
				</div>
			</FluentProvider>
		</ReduxProvider>
	);
}

export default App;
