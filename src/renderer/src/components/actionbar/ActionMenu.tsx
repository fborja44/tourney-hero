import { Caption1 } from '@fluentui/react-components';
import ActionMenuStyles from './styles/ActionMenuStyles';
import TooltipIcon from '../tooltip/TooltipIcon';

interface ActionMenuProps {
	title: string;
	children: React.ReactNode;
}

const ActionMenu = ({ title, children }: ActionMenuProps) => {
	const classes = ActionMenuStyles();

	return (
		<div className={classes.container}>
			<Caption1 className={classes.menuTitle}>{title}</Caption1>
			<div className={classes.content}>{children}</div>
		</div>
	);
};

export default ActionMenu;

interface ActionMenuSectionProps {
	label?: string;
	children: React.ReactNode;
	tooltipText?: string;
}

export const ActionMenuSection = ({ label, children, tooltipText }: ActionMenuSectionProps) => {
	const classes = ActionMenuStyles();

	return (
		<div>
			{label && (
				<Caption1 className={classes.label}>
					<span>{label}</span>
					{tooltipText && <TooltipIcon>tooltipText</TooltipIcon>}
				</Caption1>
			)}
			{children}
		</div>
	);
};
