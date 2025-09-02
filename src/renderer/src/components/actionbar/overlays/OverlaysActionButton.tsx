import { SlideTextSparkle20Regular } from '@fluentui/react-icons';
import ActionButton from '../ActionButton';
import OverlaysMenu from './OverlaysMenu';

const OverlaysActionButton = () => {
	return (
		<ActionButton
			icon={SlideTextSparkle20Regular}
			title="Current Overlay"
			width="230px"
			full
			menu={<OverlaysMenu />}
		>
			Melee Tournament Overlay
		</ActionButton>
	);
};

export default OverlaysActionButton;
