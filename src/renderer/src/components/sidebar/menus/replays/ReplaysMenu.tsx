import { makeStyles, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { ACTIONBAR_HEIGHT, FOOTER_HEIGHT, SECTION_HEADER_HEIGHT } from '@common/constants/elements';
import ReplayCard from '@renderer/components/dashboard/replay/ReplayCard';
import { useSelector } from 'react-redux';
import { AppState } from '@renderer/redux/reducers/rootReducer';

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

	const { replayList } = useSelector((state: AppState) => state.slippiState);

	return (
		<div className={classes.container}>
			<div className={classes.matchList}>
				{replayList.map((replay) => (
					<ReplayCard key={replay.fileName} replay={replay} />
				))}
			</div>
		</div>
	);
};

export default ReplaysMenu;
