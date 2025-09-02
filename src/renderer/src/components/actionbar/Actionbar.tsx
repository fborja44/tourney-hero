import { makeStyles, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { ACTIONBAR_HEIGHT } from '@common/constants/elements';
import AutomationActionButton from './automation/AutomationActionButton';
import OBSActionButton from './obs/OBSActionButton';
import OverlaysActionButton from './overlays/OverlaysActionButton';
import SlippiActionButton from './slippi/SlippiActionButton';
import TournamentActionButton from './tournament/TournamentActionButton';
// import TwitchMenu from './menus/TwitchMenu';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		boxSizing: 'border-box',
		backgroundColor: tokens.colorNeutralBackground4,
		width: '100%',
		height: ACTIONBAR_HEIGHT,
		minHeight: ACTIONBAR_HEIGHT,
		zIndex: 1000,
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3),
		...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke3)
	}
});

const Actionbar = () => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<OverlaysActionButton />
			<TournamentActionButton />
			<OBSActionButton />
			<SlippiActionButton />
			<AutomationActionButton />
		</div>
	);
};

export default Actionbar;
