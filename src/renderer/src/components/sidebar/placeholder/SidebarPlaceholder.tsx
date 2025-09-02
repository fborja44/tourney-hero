import { Button, Caption1, makeStyles, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
	empty: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		color: tokens.colorNeutralForeground3,
		'& span': {
			width: '50%',
			textAlign: 'center',
			...shorthands.margin(0, 0, tokens.spacingVerticalS, 0)
		}
	},
	button: {
		marginTop: tokens.spacingVerticalM
	}
});

interface SidebarPlaceholderProps {
	caption?: string;
	icon: React.ReactNode;
	resetData?: (...args) => void;
}

const SidebarPlaceholder = ({ caption, icon, resetData }: SidebarPlaceholderProps) => {
	const classes = useStyles();
	return (
		<div className={classes.empty}>
			{caption && <Caption1>{caption}</Caption1>}
			{icon}
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

export default SidebarPlaceholder;
