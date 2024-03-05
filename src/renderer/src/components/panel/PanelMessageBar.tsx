import {
	Body1Strong,
	MessageBar,
	MessageBarActions,
	MessageBarBody,
	MessageBarIntent,
	MessageBarTitle,
	makeStyles,
	mergeClasses,
	tokens
} from '@fluentui/react-components';

const useStyles = makeStyles({
	container: {
		minHeight: '45px',
		paddingRight: tokens.spacingHorizontalM,
		paddingLeft: tokens.spacingHorizontalM
	}
});

interface PanelMessageBarProps {
	title: string;
	icon: JSX.Element;
	children?: string | React.ReactNode;
	actions?: React.ReactNode;
	intent: MessageBarIntent;
	className?: string;
}

const PanelMessageBar = ({
	title,
	icon,
	children,
	actions,
	intent,
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
			<MessageBarActions>{actions}</MessageBarActions>
		</MessageBar>
	);
};

PanelMessageBar.defaultProps = {
	intent: 'info'
};

export default PanelMessageBar;
