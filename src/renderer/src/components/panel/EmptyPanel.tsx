import { makeStyles, tokens } from '@fluentui/react-components';
import { Sparkle24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
	empty: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		color: tokens.colorNeutralForeground3,
		backgroundColor: tokens.colorNeutralBackground2,
		'& .text': {
			marginBottom: tokens.spacingVerticalS
		}
	}
});

interface EmptyPanelProps {
	text: string;
	icon: React.ReactNode;
	hideIcon: boolean;
}

const EmptyPanel = ({ text, icon, hideIcon }: EmptyPanelProps) => {
	const classes = useStyles();

	return (
		<div className={classes.empty}>
			<span className="text">{text}</span>
			{!hideIcon && icon}
		</div>
	);
};

EmptyPanel.defaultProps = {
	text: 'Nothing to do.',
	icon: <Sparkle24Regular />,
	hideIcon: false
};

export default EmptyPanel;
