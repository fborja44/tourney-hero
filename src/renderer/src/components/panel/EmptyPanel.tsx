import { Button, makeStyles, tokens } from '@fluentui/react-components';
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
	},
	button: {
		marginTop: tokens.spacingVerticalM
	}
});

interface EmptyPanelProps {
	text: string;
	icon: React.ReactNode;
	hideIcon: boolean;
	resetData?: (...args) => void;
}

const EmptyPanel = ({ text, icon, hideIcon, resetData }: EmptyPanelProps) => {
	const classes = useStyles();

	return (
		<div className={classes.empty}>
			<span className="text">{text}</span>
			{!hideIcon && icon}
			{resetData && (
				<Button
					className={classes.button}
					onClick={resetData}
					size="small"
					appearance="primary"
				>
					Reset Data
				</Button>
			)}
		</div>
	);
};

EmptyPanel.defaultProps = {
	text: 'Nothing to do.',
	icon: <Sparkle24Regular />,
	hideIcon: false
};

export default EmptyPanel;
