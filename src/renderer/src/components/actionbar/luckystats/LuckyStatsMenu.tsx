import ActionMenu, { ActionMenuSection } from '../ActionMenu';
import ActionMenuStyles from '../styles/ActionMenuStyles';

const AutomationMenu = () => {
	const classes = ActionMenuStyles();

	return (
		<ActionMenu title="Lucky Stats Configuration">
			<ActionMenuSection label="Lucky Stats Token">
				<div></div>
			</ActionMenuSection>
		</ActionMenu>
	);
};

export default AutomationMenu;
