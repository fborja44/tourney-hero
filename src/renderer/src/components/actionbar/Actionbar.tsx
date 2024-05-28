import { makeStyles, shorthands } from '@fluentui/react-components';
import {
	SlideTextSparkle20Regular,
	Trophy20Regular,
	PlugConnected20Regular,
	PlugDisconnected20Regular
	// Video20Regular
} from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import ActionButton from './ActionButton';
import Slippi from '@renderer/assets/svg/slippi.svg';
import { ACTIONBAR_HEIGHT } from '@common/constants/elements';
import TournamentMenu from './menus/TournamentMenu';
import OBSMenu from './menus/OBSMenu';
import SlippiMenu from './menus/SlippiMenu';
import OverlaysMenu from './menus/OverlaysMenu';
import { useSelector } from 'react-redux';
import { TournamentState } from '@redux/reducers/tournamentReducer';
import { AppState } from '@redux/reducers/rootReducer';
import { useContext } from 'react';
import { OBSWebSocketClientContext } from '../../obs-websocket/OBSWebsocketProvider';
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
	},
	title: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		'& span': {
			fontWeight: tokens.fontWeightRegular
		},
		'& svg': {
			...shorthands.margin(0, tokens.spacingHorizontalS, 0, 0)
		}
	},
	button: {
		...shorthands.margin(0, 0, 0, tokens.spacingHorizontalM)
	}
});

const Actionbar = () => {
	const classes = useStyles();

	const tournamentState: TournamentState = useSelector(
		(state: AppState) => state.tournamentState
	);
	const tournamentLabel = tournamentState.validated
		? tournamentState.tournamentSlug || 'Not Configured'
		: 'API Key Not Set';

	const { connected } = useContext(OBSWebSocketClientContext);

	const { connected: slippiConnected, activeGame } = useSelector(
		(state: AppState) => state.slippiState
	);

	return (
		<div className={classes.container}>
			<ActionButton
				icon={<SlideTextSparkle20Regular />}
				title="Current Overlay"
				width="230px"
				full
				menu={<OverlaysMenu />}
			>
				Melee Tournament Overlay
			</ActionButton>
			<ActionButton
				icon={<Trophy20Regular />}
				title={tournamentState.selectedEvent?.name ?? 'start.gg Tournament'}
				menu={<TournamentMenu />}
			>
				{tournamentLabel}
			</ActionButton>
			<ActionButton
				icon={connected ? <PlugConnected20Regular /> : <PlugDisconnected20Regular />}
				title="OBS Websocket"
				menu={<OBSMenu />}
			>
				{connected ? 'Connected to OBS' : 'Not Configured'}
			</ActionButton>
			<ActionButton
				icon={<img src={Slippi} />}
				title="Slippi Connection"
				menu={<SlippiMenu />}
			>
				{activeGame !== null && slippiConnected
					? 'Game In-Progress'
					: slippiConnected
						? 'Waiting For Game...'
						: 'Not Configured'}
			</ActionButton>
			{/* <ActionButton icon={<Video20Regular />} title="Twitch Connection" menu={<TwitchMenu />}>
				Not Connected
			</ActionButton> */}
		</div>
	);
};

export default Actionbar;
