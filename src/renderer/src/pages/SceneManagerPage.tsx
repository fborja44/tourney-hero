import PageHeader from '../pageheader/PageHeader';
import { WindowEdit20Regular, PlugDisconnected20Regular } from '@fluentui/react-icons';
import Panel from '@renderer/components/panel/Panel';
import PageLayout from './PageLayout';
import { useContext } from 'react';
import { OBSWebSocketClientContext } from '@renderer/obs-websocket/OBSWebsocketProvider';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import DashboardScene from '@renderer/components/dashboard/scene/DashboardScene';
import EmptyPanel from '@renderer/components/panel/EmptyPanel';
import dashboardStyles from '@renderer/components/dashboard/styles/DashboardStyles';
import FormStyles from '@renderer/components/form/styles/FormStyles';
import { Body1 } from '@fluentui/react-components';

const SceneManagerPage = () => {
	const classes = dashboardStyles();
	const formStyles = FormStyles();

	const { connected } = useContext(OBSWebSocketClientContext);

	const appScenes = useSelector((state: AppState) => state.scenesState);

	const elementList = appScenes.map((scene) => (
		<DashboardScene key={`${scene.title}-card`} scene={scene} />
	));

	return (
		<PageLayout header={<PageHeader title="Scene Manager" icon={<WindowEdit20Regular />} />}>
			<Panel as="section">
				{connected ? (
					<div className={formStyles.formSection}>
						<Body1 className={formStyles.sectionTitle}>App Scenes</Body1>
						<div className={classes.listContainer}>{elementList}</div>
					</div>
				) : (
					<EmptyPanel
						text="OBS Websocket Not Configured"
						icon={<PlugDisconnected20Regular />}
					/>
				)}
			</Panel>
		</PageLayout>
	);
};

export default SceneManagerPage;
