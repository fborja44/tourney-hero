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
	const { obs, connected: OBSConnected } = useContext(OBSWebSocketClientContext);

	const { currentScene, sceneList } = useSelector((state: AppState) => state.obsState);

	/**
	 * Sends a request through OBS Websocket to set the current program scene
	 */
	const sendOBSSceneRequest = async () => {
		try {
			if (obs && OBSConnected) {
				await obs.call('SetCurrentProgramScene', { sceneName: sceneName });
			}
		} catch (err) {
			console.error(err);
		}
	};

	const active = currentScene === sceneName;

	const sceneExists = findScene(sceneList, sceneName) !== undefined;

	return (
		<Button
			className={className}
			size="small"
			disabled={disabled || !obs || !OBSConnected || !sceneExists || active}
			onClick={sendOBSSceneRequest}
		>
			{sceneExists ? 'Switch To Scene' : 'Scene Not Found'}
		</Button>
	);
};

export default SwitchSceneButton;
