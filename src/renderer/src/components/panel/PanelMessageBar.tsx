import {
	Body1Strong,
	MessageBarIntent,
	makeStyles,
	mergeClasses,
	shorthands,
	tokens
} from '@fluentui/react-components';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		columnGap: tokens.spacingHorizontalM,
		width: '100%',
		...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalL)
	},
	body: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row',
		columnGap: tokens.spacingHorizontalS
	},
	info: {
		backgroundColor: tokens.colorNeutralBackground3,
		...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
		'& .Panel-MessageBar-Title svg': {
			color: tokens.colorNeutralForeground2
		},
		alignSelf: 'flex-start'
	},
	success: {
		backgroundColor: tokens.colorStatusSuccessBackground1,
		...shorthands.border('1px', 'solid', tokens.colorStatusSuccessBorder1),
		'& .Panel-MessageBar-Title svg': {
			color: tokens.colorStatusSuccessForeground1
		}
	},
	warning: {
		backgroundColor: tokens.colorStatusWarningBackground1,
		...shorthands.border('1px', 'solid', tokens.colorStatusWarningBorder1),
		'& .Panel-MessageBar-Title svg': {
			color: tokens.colorStatusWarningForeground1
		}
	},
	error: {
		backgroundColor: tokens.colorStatusDangerBackground1,
		...shorthands.border('1px', 'solid', tokens.colorStatusDangerBorder1),
		'& .Panel-MessageBar-Title svg': {
			color: tokens.colorStatusDangerForeground1
		}
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: tokens.spacingHorizontalS
	},
	titleText: {
		textWrap: 'nowrap',
		whiteSpace: 'nowrap'
	},
	content: { display: 'flex', alignItems: 'center' }
});

interface PanelMessageBarProps {
	title: string;
	icon: React.ReactNode | JSX.Element;
	children?: string | React.ReactNode;
	actions?: React.ReactNode;
	intent: MessageBarIntent;
}

const PanelMessageBar = ({ title, icon, children, actions, intent }: PanelMessageBarProps) => {
	const classes = useStyles();

	let intentClass: string;
	switch (intent) {
		case 'info': {
			intentClass = classes.info;
			break;
		}
		case 'success': {
			intentClass = classes.success;
			break;
		}
		case 'warning': {
			intentClass = classes.warning;
			break;
		}
		case 'error': {
			intentClass = classes.error;
			break;
		}
		default: {
			intentClass = classes.info;
			break;
		}
	}

	return (
		<section className={mergeClasses(classes.container, intentClass)}>
			<span className={mergeClasses('Panel-MessageBar-Title', classes.titleContainer)}>
				{icon}
				<Body1Strong className={classes.titleText}>{title}</Body1Strong>
			</span>
			<div className={classes.body}>
				<div className={classes.content}>{children}</div>
			</div>
			{actions}
		</section>
	);
};

PanelMessageBar.defaultProps = {
	intent: 'info'
};

export default PanelMessageBar;
