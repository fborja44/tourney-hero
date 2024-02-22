import { MenuGroup, MenuGroupHeader, makeStyles, shorthands } from '@fluentui/react-components';
import { Apps20Regular, WindowEdit20Regular, Server16Regular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import NavbarItem from './item/NavbarItem';
import SidebarHeader from '../sidebar/header/SidebarHeader';
import NavbarFooter from './footer/NavbarFooter';
import { SocketClientContext } from '../../socket/SocketClientProvider';
import { useContext, useState } from 'react';
import { Scene } from '../../interfaces/Types';
import {
	ACTIONBAR_HEIGHT,
	FOOTER_HEIGHT,
	NAVBAR_FOOTER_HEIGHT,
	NAVBAR_WIDTH,
	SECTION_HEADER_HEIGHT
} from '@renderer/constants/elements';
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

interface NavbarProps {
	scenes: Scene[];
}

const Navbar = ({ scenes }: NavbarProps) => {
	const classes = useStyles();

	const { socket, connected } = useContext(SocketClientContext);

	const [selectedTab, setSelectedTab] = useState('/');

	return (
		<section className={classes.container}>
			<SidebarHeader title={'Overlay Menu'} />
			<div className={classes.tabList}>
				<MenuGroup>
					<MenuGroupHeader className={classes.groupHeader}>Dashboard</MenuGroupHeader>
					<NavbarItem
						icon={<Apps20Regular />}
						label="Match Dashboard"
						to="/"
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
