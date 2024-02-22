import { useState } from 'react';

import Start from '@renderer/assets/svg/start.svg';
import { Sparkle24Regular, EmojiSad24Regular } from '@fluentui/react-icons';
import {
	SelectTabData,
	SelectTabEvent,
	Tab,
	TabList,
	makeStyles,
	shorthands
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import SidebarHeader from './header/SidebarHeader';
import PreviewMenu from './menus/PreviewMenu';
import MatchesMenu from './menus/match/MatchesMenu';
import { ACTIONBAR_HEIGHT, FOOTER_HEIGHT, SECTION_HEADER_HEIGHT } from '../../constants/elements';
import { Route, Routes } from 'react-router-dom';
import Empty from './SidebarPlaceholder';
import BracketMenu from './menus/bracket/BracketMenu';
import { ErrorBoundary } from 'react-error-boundary';
import DashboardMenu from './menus/dashboard/DashboardMenu';

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
	},
	tabIcon: {
		color: tokens.colorNeutralForeground1,
		width: '20px',
		height: '20px'
	}
});

const Sidebar = () => {
	const classes = useStyles();

	const [open, setOpen] = useState(true);
	const [selectedTab, setSelectedTab] = useState('matches');

	return (
		<section className={`${classes.container} ${open ? classes.open : classes.closed}`}>
			<SidebarHeader
				title={
					<TabList
						size="small"
						className={classes.tabList}
						defaultValue="matches"
						selectedValue={selectedTab}
						onTabSelect={(_ev: SelectTabEvent, data: SelectTabData) => {
							setSelectedTab(data.value as string);
						}}
					>
						<Tab value="matches" icon={<img className={classes.tabIcon} src={Start} />}>
							start.gg
						</Tab>
						{/* <Tab value='preview'>Preview</Tab> */}
					</TabList>
				}
				onClick={() =>
					setOpen((prevOpen) => {
						return !prevOpen;
					})
				}
				open={open}
			/>
			{open && (
				<div className={classes.content}>
					<ErrorBoundary
						fallback={
							<Empty
								caption={'An error has occurred.'}
								icon={<EmojiSad24Regular />}
							/>
						}
					>
						{selectedTab === 'preview' && <PreviewMenu />}
						{selectedTab === 'matches' && (
							<Routes>
								<Route path={`/`} element={<DashboardMenu />} />
								<Route path={`/gameplay`} element={<MatchesMenu />} />
								<Route path={`/bracket`} element={<BracketMenu />} />
								<Route
									path="*"
									element={
										<Empty
											caption={'Nothing to do.'}
											icon={<Sparkle24Regular />}
										/>
									}
								/>
							</Routes>
						)}
					</ErrorBoundary>
				</div>
			)}
		</section>
	);
};

export default Sidebar;
