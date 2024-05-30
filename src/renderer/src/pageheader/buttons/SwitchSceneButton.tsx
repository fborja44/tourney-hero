import { Button } from '@fluentui/react-components';
import { useContext } from 'react';
import { OBSWebSocketClientContext } from '@renderer/obs-websocket/OBSWebsocketProvider';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { findScene } from '@renderer/utils/obs';
import { Scene } from '@common/interfaces/Types';
import { Add12Regular } from '@fluentui/react-icons';

interface SwitchSceneButtonProps {
	scene: Scene;
	className?: string;
	disabled?: boolean;
}

const SwitchSceneButton = ({ className, disabled, scene }: SwitchSceneButtonProps) => {
	const {
		obs,
		connected: OBSConnected,
		sendOBSSceneRequest,
		createOBSScene
	} = useContext(OBSWebSocketClientContext);

	const { currentScene, sceneList } = useSelector((state: AppState) => state.obsState);

	const { title: sceneName, source } = scene;

	const active = currentScene === sceneName;

	const sceneExists = findScene(sceneList, sceneName) !== undefined;

	const handleSwitchScene = () => {
		if (obs && sendOBSSceneRequest) {
			sendOBSSceneRequest(sceneName);
		}
	};

	const handleCreateScene = () => {
		if (obs && createOBSScene) {
			createOBSScene(sceneName, source);
		}
	};

	return sceneExists ? (
		<Button
			className={className}
			size="small"
			disabled={disabled || !obs || !OBSConnected || !sceneExists || active}
			onClick={handleSwitchScene}
		>
			Switch To Scene
		</Button>
	) : (
		<Button
			className={className}
			size="small"
			disabled={disabled || !obs || !OBSConnected || sceneExists || active}
			onClick={handleCreateScene}
			icon={<Add12Regular />}
			iconPosition="after"
		>
			Create Scene
		</Button>
	);
};

export default SwitchSceneButton;
