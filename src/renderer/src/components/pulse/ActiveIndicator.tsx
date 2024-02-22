import { Caption1, makeStyles, tokens } from '@fluentui/react-components';
import Pulse from './Pulse';

const useStyles = makeStyles({
	active: {
		color: tokens.colorPaletteRedForeground1,
		display: 'flex',
		flexDirection: 'row',
		width: 'fit-content',
		alignItems: 'center',
		justifyContent: 'center',
		textTransform: 'uppercase'
	}
});

const ActiveIndicator = () => {
	const classes = useStyles();

	return (
		<Caption1 className={classes.active}>
			<span>Active</span> <Pulse />
		</Caption1>
	);
};

export default ActiveIndicator;
