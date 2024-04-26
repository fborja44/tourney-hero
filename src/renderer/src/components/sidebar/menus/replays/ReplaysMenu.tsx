import { Button, Caption1, Spinner, makeStyles, shorthands } from '@fluentui/react-components';
import { TrophyOffRegular, ChevronDown20Regular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import { useSelector } from 'react-redux';
import { ACTIONBAR_HEIGHT, FOOTER_HEIGHT, SECTION_HEADER_HEIGHT } from '@common/constants/elements';
import TournamentCard from '../tournament/TournamentCard';
import Empty from '../../SidebarPlaceholder';
import { AppState } from '@redux/reducers/rootReducer';
import { sortMatches } from '@utils/tournament';
import { useEffect, useState } from 'react';
import ReplayCard from '@renderer/components/dashboard/replay/ReplayCard';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	matchList: {
		display: 'flex',
		flexDirection: 'column',
		...shorthands.overflow('hidden', 'auto'),
		height: `calc(100vh - ${ACTIONBAR_HEIGHT} - ${SECTION_HEADER_HEIGHT} - ${FOOTER_HEIGHT})`
	},
	moreButton: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		height: 'fit-content',
		minHeight: '24px',
		...shorthands.gap(tokens.spacingHorizontalS),
		...shorthands.margin(tokens.spacingVerticalS, 0)
	},
	empty: {
		alignSelf: 'center',
		color: tokens.colorNeutralForeground2,
		...shorthands.margin(tokens.spacingVerticalL)
	},
	spinner: {
		marginTop: tokens.spacingVerticalXXXL
	}
});

const ReplaysMenu = () => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.matchList}>
				<ReplayCard />
			</div>
		</div>
	);
};

export default ReplaysMenu;
