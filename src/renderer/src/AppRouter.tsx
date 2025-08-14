import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import EmptyPanel from './components/panel/EmptyPanel';
import PageLayout from './pages/PageLayout';
import { capitalize, toCamelCase } from '@utils/string';
import { OverlayData } from '@common/interfaces/Data';
import SceneManagerPage from './pages/SceneManagerPage';
import DashboardPage from './pages/DashboardPage';
import Main from './components/main/Main';
import { useSelector } from 'react-redux';
import { AppState } from '@redux/reducers/rootReducer';
import SceneHeader from './pageheader/SceneHeader';
import LocalDataPage from './pages/LocalDataPage';
import SlippiMessageBar from './components/form/messages/SlippiMessageBar';
import useSocket from '@hooks/controls/useSocket';
import { SceneData } from '@common/interfaces/Types';

const AppRouter = () => {
	const scenesState = useSelector((state: AppState) => state.scenesState);

	const dataState = useSelector((state: AppState) => state.dataState);

	const { sendSocketData } = useSocket();

	const handleSendData = (scene: SceneData) => {
		try {
			let title = scene.title;
			if (scene.title === 'Intermission') {
				title = 'Commentators';
			}
			const data = dataState[toCamelCase(title) as keyof OverlayData];
			sendSocketData(
				`update${capitalize(title.replace(' ', ''))}`, // Remove spaces from title if needed and capitalize words
				data
			);
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	const router = createHashRouter([
		{
			path: '/',
			element: <Main />,
			children: [
				{ path: '/', element: <Navigate to="/gameplay" replace={true} /> },
				{
					path: '/dashboard',
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
										scene={scene}
										sendData={() => handleSendData(scene)}
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
