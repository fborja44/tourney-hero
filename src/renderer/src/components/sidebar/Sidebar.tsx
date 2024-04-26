import { useState } from 'react';

import Start from '@renderer/assets/svg/start.svg';
import Slippi from '@renderer/assets/svg/slippi.svg';
import { EmojiSad24Regular } from '@fluentui/react-icons';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import SidebarHeader from './header/SidebarHeader';
import MatchesMenu from './menus/match/MatchesMenu';
import { ACTIONBAR_HEIGHT, FOOTER_HEIGHT, SECTION_HEADER_HEIGHT } from '@common/constants/elements';
import { Route, Routes } from 'react-router-dom';
import Empty from './SidebarPlaceholder';
import BracketMenu from './menus/bracket/BracketMenu';
import { ErrorBoundary } from 'react-error-boundary';
import DashboardMenu from './menus/dashboard/DashboardMenu';
import ReplaysMenu from './menus/replays/ReplaysMenu';
import SidebarTitle from './header/SidebarTitle';

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
						fallback={
							<Empty
								caption={'An error has occurred.'}
								icon={<EmojiSad24Regular />}
							/>
						}
						onError={(error) => {
							console.error(error);
						}}
					>
						<Routes>
							<Route path={`/`} element={<DashboardMenu />} />
							<Route path="*" element={<MatchesMenu />} />
							<Route path={`/bracket`} element={<BracketMenu />} />
							<Route path={`/statistics`} element={<ReplaysMenu />} />
							{/* <Route
									path="*"
									element={
										<Empty
											caption={'Nothing to do.'}
											icon={<Sparkle24Regular />}
										/>
									}
								/> */}
						</Routes>
					</ErrorBoundary>
				</div>
			)}
		</section>
	);
};

export default Sidebar;
