import { useState } from 'react';

import Start from '@renderer/assets/svg/start.svg';
import Slippi from '@renderer/assets/svg/slippi.svg';
import { EmojiSad24Regular } from '@fluentui/react-icons';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import SidebarHeader from './header/SidebarHeader';
import MatchesMenu from './menu/match/MatchesMenu';
import { ACTIONBAR_HEIGHT, FOOTER_HEIGHT, SECTION_HEADER_HEIGHT } from '@common/constants/elements';
import { Route, Routes } from 'react-router-dom';
import SidebarPlaceholder from './placeholder/SidebarPlaceholder';
import BracketMenu from './menu/bracket/BracketMenu';
import { ErrorBoundary } from 'react-error-boundary';
import ReplaysMenu from './menu/replays/ReplaysMenu';
import SidebarTitle from './header/SidebarTitle';
import { setMatches } from '@renderer/redux/actions/tournamentActions';
import { resetReplayData } from '@renderer/redux/actions/replaysActions';
import { useDispatch } from 'react-redux';

const WIDTH = '240px';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: tokens.colorNeutralBackground2,
		height: '100%',
		boxSizing: 'border-box',
		// ...shorthands.transition("width", "0.5s", "ease-in"),
		...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralStroke3)
	},
	list: {
		width: '100%'
	},
	groupHeader: {
		fontSize: tokens.fontSizeBase100,
		textTransform: 'uppercase'
	},
	overlayButton: {
		justifyContent: 'start'
	},
	content: {
		height: `calc(100vh - ${ACTIONBAR_HEIGHT} - ${SECTION_HEADER_HEIGHT} - ${FOOTER_HEIGHT})`
	},
	tabList: {
		height: '38px'
	},
	open: {
		width: WIDTH,
		minWidth: WIDTH
	},
	closed: {
		width: '40px',
		minWidth: '40px'
	}
});

const Sidebar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [open, setOpen] = useState(true);

	return (
		<section className={`${classes.container} ${open ? classes.open : classes.closed}`}>
			<SidebarHeader
				onClick={() =>
					setOpen((prevOpen) => {
						return !prevOpen;
					})
				}
				open={open}
			>
				<Routes>
					<Route
						path="*"
						element={<SidebarTitle iconSrc={Start}>start.gg</SidebarTitle>}
					/>
					<Route
						path="/statistics"
						element={<SidebarTitle iconSrc={Slippi}>Slippi Replays</SidebarTitle>}
					/>
				</Routes>
			</SidebarHeader>
			{open && (
				<div className={classes.content}>
					<ErrorBoundary
						fallbackRender={({ error, resetErrorBoundary }) => {
							console.error(error);
							return (
								<SidebarPlaceholder
									caption={'An error has occurred.'}
									icon={<EmojiSad24Regular />}
									resetData={resetErrorBoundary}
								/>
							);
						}}
						onReset={() => {
							// Reset tournament/replay data
							dispatch(setMatches([]));
							dispatch(resetReplayData());
						}}
					>
						<Routes>
							<Route path={`/bracket`} element={<BracketMenu />} />
							<Route path={`/statistics`} element={<ReplaysMenu />} />
							<Route path="*" element={<MatchesMenu />} />
						</Routes>
					</ErrorBoundary>
				</div>
			)}
		</section>
	);
};

export default Sidebar;
