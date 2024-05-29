import {
	Button,
	ButtonProps,
	makeStyles,
	mergeClasses,
	shorthands,
	tokens
} from '@fluentui/react-components';

const useStyles = makeStyles({
	actionsContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%'
	},
	sidebarActionButton: {
		flexGrow: 1,
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3),
		...shorthands.padding(tokens.spacingVerticalSNudge),
		...shorthands.borderRadius(0)
	},
	divider: {
		...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke3)
	}
});

interface SidebarActionButtonProps {
	border?: boolean;
}

export const SidebarActionButton = (props: SidebarActionButtonProps & ButtonProps) => {
	const classes = useStyles();
	return (
		<Button
			{...props}
			className={mergeClasses(
				classes.sidebarActionButton,
				props.border ? classes.divider : ''
			)}
			iconPosition="after"
			appearance="subtle"
			size="small"
		/>
	);
};

export interface SidebarAction {
	label: string;
}

export interface SidebarActionsProps {
	actions?: (SidebarAction & ButtonProps)[];
}

const SidebarActions = ({ actions }: SidebarActionsProps) => {
	const classes = useStyles();

	return (
		actions && (
			<div className={classes.actionsContainer}>
				{actions.map((action, i) => (
					<SidebarActionButton
						{...action}
						key={`sidebar-action-${action.label}`}
						border={i !== actions.length - 1}
					>
						{action.label}
					</SidebarActionButton>
				))}
			</div>
		)
	);
};

export default SidebarActions;
