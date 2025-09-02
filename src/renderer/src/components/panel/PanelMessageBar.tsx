import { MESSAGE_BAR_HEIGHT } from '@common/constants/elements';
import {
	Body1Strong,
	MessageBar,
	MessageBarActions,
	MessageBarBody,
	MessageBarIntent,
	MessageBarTitle,
	makeStyles,
	mergeClasses,
	// shorthands,
	tokens
} from '@fluentui/react-components';

const useStyles = makeStyles({
	container: {
		minHeight: MESSAGE_BAR_HEIGHT,
		paddingRight: tokens.spacingHorizontalM,
		paddingLeft: tokens.spacingHorizontalM
		// ...shorthands.borderTop(0),
		// ...shorthands.borderRight(0),
		// ...shorthands.borderLeft(0)
	},
	actions: {
		paddingRight: 0
	}
});

interface PanelMessageBarProps {
	title: string;
	icon: JSX.Element;
	children?: string | React.ReactNode;
	actions?: React.ReactNode;
	intent?: MessageBarIntent;
	className?: string;
}

const PanelMessageBar = ({
	title,
	icon,
	children,
	actions,
	intent = 'info',
	className
}: PanelMessageBarProps) => {
	const classes = useStyles();

	return (
		<MessageBar
			shape="square"
			className={className ? mergeClasses(classes.container, className) : classes.container}
			intent={intent}
			icon={icon}
			layout="auto"
		>
			<MessageBarBody>
				<MessageBarTitle>
					<Body1Strong>{title}:</Body1Strong>
				</MessageBarTitle>
				{children}
			</MessageBarBody>
			<MessageBarActions className={classes.actions}>{actions}</MessageBarActions>
		</MessageBar>
	);
};

export default PanelMessageBar;
