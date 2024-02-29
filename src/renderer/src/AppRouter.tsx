import { RouterProvider, createHashRouter } from 'react-router-dom';
import EmptyPanel from './components/panel/EmptyPanel';
import PageLayout from './pages/PageLayout';
import { capitalize, toCamelCase } from './utils/string';
import { Data, OverlayData } from '@common/interfaces/Data';
import SceneManagerPage from './pages/SceneManagerPage';
import DashboardPage from './pages/DashboardPage';
import Main from './components/main/Main';
import { useSelector } from 'react-redux';
import { AppState } from './redux/reducers/rootReducer';
import SceneHeader from './pageheader/SceneHeader';
import { useContext } from 'react';
import { SocketClientContext } from './socket/SocketClientProvider';
import LocalDataPage from './pages/LocalDataPage';
import SlippiMessageBar from './components/form/messages/SlippiMessageBar';

const AppRouter = () => {
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
					path: '',
					element: <DashboardPage />
				},
				{
					path: '/scenes',
					element: <SceneManagerPage />
				},
				{
					path: '/localData',
					element: <LocalDataPage />
				},
				...scenesState.map((scene) => ({
					key: `${scene.title}-page`,
					path: `/${scene.title.toLowerCase()}`,
					element: (
						<PageLayout
							header={
								<>
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
													dataState[
														toCamelCase(title) as keyof OverlayData
													]
												);
												console.log(
													dataState[
														toCamelCase(title) as keyof OverlayData
													]
												);
											} catch (err) {
												console.error(err);
											}
										}}
										dataField={toCamelCase(scene.title) as keyof OverlayData}
									/>
									<SlippiMessageBar />
								</>
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

	return <RouterProvider router={router} />;
};

export default AppRouter;
