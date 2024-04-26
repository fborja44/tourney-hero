import { MenuGroup, MenuGroupHeader, makeStyles, shorthands } from '@fluentui/react-components';
import {
	Apps20Regular,
	WindowEdit20Regular,
	Server16Regular,
	DatabasePerson20Regular
} from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import NavbarItem from './item/NavbarItem';
import SidebarHeader from '../sidebar/header/SidebarHeader';
import NavbarFooter from './footer/NavbarFooter';
import { SocketClientContext } from '../../socket/SocketClientProvider';
import { useContext, useState } from 'react';
import { Scene } from '@common/interfaces/Types';
import {
	ACTIONBAR_HEIGHT,
	FOOTER_HEIGHT,
	NAVBAR_FOOTER_HEIGHT,
	NAVBAR_WIDTH,
	SECTION_HEADER_HEIGHT
} from '@common/constants/elements';
import { useSelector } from 'react-redux';
import { AppState } from '@renderer/redux/reducers/rootReducer';
// import AddButton from "./AddButton";

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: tokens.colorNeutralBackground2,
		width: NAVBAR_WIDTH,
		minWidth: NAVBAR_WIDTH,
		boxSizing: 'border-box',
		...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke3)
	},
	tabList: {
		width: '100%',
		overflowY: 'auto',
		height: `calc(100vh - ${FOOTER_HEIGHT} - ${ACTIONBAR_HEIGHT} - ${SECTION_HEADER_HEIGHT} - ${NAVBAR_FOOTER_HEIGHT})`,
		...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM)
	},
	groupHeader: {
		color: tokens.colorNeutralForeground3,
		fontSize: tokens.fontSizeBase100,
		textTransform: 'uppercase',
		...shorthands.padding(0, 0)
	},
	overlayButton: {
		justifyContent: 'start'
	},
	addButton: {
		width: '100%',
		maxWidth: '100%',
		color: tokens.colorNeutralForeground3,
		...shorthands.margin(tokens.spacingVerticalS, 0, 0, 0)
	},
	connected: {
		color: tokens.colorNeutralForeground2
	},
	disconnected: {
		color: tokens.colorPaletteRedBackground3
	}
});

const Navbar = () => {
	const classes = useStyles();

	const { socket, connected } = useContext(SocketClientContext);

	const [selectedTab, setSelectedTab] = useState('/gameplay');

	/**
	 * Scenes State
	 */
	const scenes: Scene[] = useSelector((state: AppState) => state.scenesState);

	return (
		<section className={classes.container}>
			<SidebarHeader>Overlay Menu</SidebarHeader>
			<div className={classes.tabList}>
				<MenuGroup>
					<MenuGroupHeader className={classes.groupHeader}>Dashboard</MenuGroupHeader>
					<NavbarItem
						icon={<Apps20Regular />}
						label="Match Dashboard"
						to="/dashboard"
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
					/>
					<NavbarItem
						icon={<WindowEdit20Regular />}
						label="Scene Manager"
						to="/scenes"
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
					/>
					<NavbarItem
						icon={<DatabasePerson20Regular />}
						label="Local Data"
						to="/localData"
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
					/>
				</MenuGroup>
				<MenuGroup>
					<MenuGroupHeader className={classes.groupHeader}>Scenes</MenuGroupHeader>
					{scenes.map((scene) => (
						<NavbarItem
							key={`${scene.title}-sidebar`}
							icon={scene.icon}
							label={scene.title}
							selectedTab={selectedTab}
							setSelectedTab={setSelectedTab}
						/>
					))}
				</MenuGroup>
				{/* <AddButton /> */}
			</div>
			<NavbarFooter
				to="/server"
				icon={
					<Server16Regular
						className={connected ? classes.connected : classes.disconnected}
					/>
				}
				title="Server Status"
			>
				{connected ? 'Connected to Server' : !socket ? 'Not Configured' : 'Disconnected'}{' '}
				{/* States: Offline, Disconnected, Unverified */}
			</NavbarFooter>
		</section>
	);
};

export default Navbar;
