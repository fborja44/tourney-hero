import { Button } from '@fluentui/react-components';
import { useContext } from 'react';
import { OBSWebSocketClientContext } from '@renderer/obs-websocket/OBSWebsocketProvider';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { findScene } from '@renderer/utils/obs';

interface SwitchSceneButtonProps {
	sceneName: string;
	className?: string;
	disabled?: boolean;
}

const SwitchSceneButton = ({ className, disabled, sceneName }: SwitchSceneButtonProps) => {
	const {
		obs,
		connected: OBSConnected,
		sendOBSSceneRequest
	} = useContext(OBSWebSocketClientContext);

	const { currentScene, sceneList } = useSelector((state: AppState) => state.obsState);

	const active = currentScene === sceneName;

	const sceneExists = findScene(sceneList, sceneName) !== undefined;

	const handleClick = () => {
		if (obs && sendOBSSceneRequest) {
			sendOBSSceneRequest(sceneName);
		}
	};

	return (
		<Button
			className={className}
			size="small"
			disabled={disabled || !obs || !OBSConnected || !sceneExists || active}
			onClick={handleClick}
		>
			{sceneExists ? 'Switch To Scene' : 'Scene Not Found'}
		</Button>
	);
};

export default SwitchSceneButton;
