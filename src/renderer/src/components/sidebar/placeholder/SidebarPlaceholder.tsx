import { Caption1, makeStyles, shorthands } from '@fluentui/react-components';
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
	}
});

interface SidebarPlaceholderProps {
	caption?: string;
	icon: React.ReactNode;
}

const SidebarPlaceholder = ({ caption, icon }: SidebarPlaceholderProps) => {
	const classes = useStyles();
	return (
		<div className={classes.empty}>
			{caption && <Caption1>{caption}</Caption1>}
			{icon}
		</div>
	);
};

export default SidebarPlaceholder;
