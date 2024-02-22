import { makeStyles, shorthands } from '@fluentui/react-components';
import Actionbar from './components/actionbar/Actionbar';
import Footer from './components/footer/Footer';
import EmptyPanel from './components/panel/EmptyPanel';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Main from './components/main/Main';
import { useSelector } from 'react-redux';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import SceneHeader from './pageheader/SceneHeader';
import PageLayout from './pages/PageLayout';
import { capitalize, toCamelCase } from './utils/string';
import { Data, OverlayData } from './interfaces/Data';
import { useContext } from 'react';
import { SocketClientContext } from './socket/SocketClientProvider';
import SceneManagerPage from './pages/SceneManagerPage';

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
	const classes = useStyles();

	// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

	const scenesState = useSelector((state: AppState) => state.scenesState);

	const dataState = useSelector((state: AppState) => state.dataState);

	const { socket } = useContext(SocketClientContext);

	/**
	 * Function to send data to the server through socket.io
	 * @param event The event name
	 * @param data The overlay data to send
	 */
	const sendData = (event: string, data: Data) => {
		const result = socket?.emit(event, data);
		console.log(result ? `Event: ${event}` : 'Transmission failed');
	};

	const router = createHashRouter([
		{
			path: '/',
			element: <Main />,
			children: [
				{
					path: '/',
					element: <DashboardPage />
				},
				{
					path: '/scenes',
					element: <SceneManagerPage />
				},
				...scenesState.map((scene) => ({
					key: `${scene.title}-page`,
					path: `/${scene.title.toLowerCase()}`,
					element: (
						<PageLayout
							header={
								<SceneHeader
									title={scene.title}
									icon={scene.icon}
									sendData={() => {
										try {
											let title = scene.title;
											if (scene.title === 'Intermission') {
												title = 'Commentators';
											}
											sendData(
												`update${capitalize(title.replace(' ', ''))}`, // Remove spaces from title if needed and capitalize words
												dataState[toCamelCase(title) as keyof OverlayData]
											);
											console.log(
												dataState[toCamelCase(title) as keyof OverlayData]
											);
										} catch (err) {
											console.error(err);
										}
									}}
									dataField={toCamelCase(scene.title) as keyof OverlayData}
								/>
							}
						>
							{scene.panel}
						</PageLayout>
					)
				}))
			],
			errorElement: <EmptyPanel text="Invalid Route" />
		}
	]);

	return (
		<div className={classes.appContainer}>
			<Actionbar />
			<RouterProvider router={router} />
			<Footer />
		</div>
	);
}

export default App;
