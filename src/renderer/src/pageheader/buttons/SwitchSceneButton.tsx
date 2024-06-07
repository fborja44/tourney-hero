import {
	Button,
	Menu,
	MenuButtonProps,
	MenuItem,
	MenuList,
	MenuPopover,
	MenuTrigger,
	SplitButton
} from '@fluentui/react-components';
import { useContext } from 'react';
import { OBSWebSocketClientContext } from '@renderer/obs/OBSWebsocketProvider';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import { findScene } from '@renderer/utils/obs';
import { SceneData } from '@common/interfaces/Types';
import { Add12Regular } from '@fluentui/react-icons';

interface SwitchSceneButtonProps {
	sceneData: SceneData;
	className?: string;
	disabled?: boolean;
}

const SwitchSceneButton = ({ className, disabled, sceneData }: SwitchSceneButtonProps) => {
	const {
		obs,
		connected: OBSConnected,
		switchCurrentSceneProgram,
		repairOBSScene,
		createOBSScene
	} = useContext(OBSWebSocketClientContext);

	const { currentScene, sceneList } = useSelector((state: AppState) => state.obsState);

	const { title: sceneName } = sceneData;

	const active = currentScene === sceneName;

	const sceneExists = findScene(sceneList, sceneName) !== undefined;

	const handleSwitchScene = () => {
		if (obs && switchCurrentSceneProgram) {
			switchCurrentSceneProgram(sceneName);
		}
	};

	const handleCreateScene = () => {
		if (obs && createOBSScene) {
			createOBSScene(sceneData);
		}
	};

	const handleRepairScene = () => {
		if (obs && repairOBSScene) {
			repairOBSScene(sceneData);
		}
	};

	const buttonDisabled = disabled || !obs || !OBSConnected;

	return sceneExists ? (
		<Menu positioning="below-end">
			<MenuTrigger disableButtonEnhancement>
				{(triggerProps: MenuButtonProps) => (
					<SplitButton
						className={className}
						size="small"
						primaryActionButton={{
							onClick: handleSwitchScene,
							disabled: buttonDisabled || active || !sceneExists
						}}
						menuButton={triggerProps}
					>
						Switch To Scene
					</SplitButton>
				)}
			</MenuTrigger>

			<MenuPopover>
				<MenuList>
					<MenuItem disabled={buttonDisabled || !sceneExists} onClick={handleRepairScene}>
						Repair Scene Items
					</MenuItem>
				</MenuList>
			</MenuPopover>
		</Menu>
	) : (
		<Button
			className={className}
			size="small"
			disabled={buttonDisabled}
			onClick={handleCreateScene}
			icon={<Add12Regular />}
			iconPosition="after"
		>
			Create Scene
		</Button>
	);
};

export default SwitchSceneButton;
