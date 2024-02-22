import { Caption2, makeStyles, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';

interface FooterItemProps {
	label: string;
	icon?: JSX.Element;
}

const useStyles = makeStyles({
	itemContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		height: '20px',
		backgroundColor: tokens.colorNeutralBackground2,
		...shorthands.padding(0, tokens.spacingHorizontalS),
		'& svg': {
			...shorthands.margin(0, tokens.spacingHorizontalXS, 0, 0)
		}
	}
});

const FooterItem = ({ label, icon }: FooterItemProps) => {
	const classes = useStyles();
	return (
		<div className={classes.itemContainer}>
			{icon}
			<Caption2>{label}</Caption2>
		</div>
	);
};

export default FooterItem;
