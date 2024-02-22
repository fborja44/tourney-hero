import { MenuItem, makeStyles, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';

interface SidebarItemProps {
	icon?: JSX.Element;
	children: React.ReactNode;
}

const useStyles = makeStyles({
	root: {
		backgroundColor: tokens.colorNeutralBackground2,
		...shorthands.margin(0, 0, tokens.spacingVerticalXS, 0),
		':hover': {
			backgroundColor: tokens.colorNeutralBackground2Hover
		}
	}
});

const SidebarItem = ({ icon, children }: SidebarItemProps) => {
	const classes = useStyles();
	return (
		<MenuItem icon={icon} className={classes.root}>
			{children}
		</MenuItem>
	);
};

export default SidebarItem;
