import { Body1, makeStyles, mergeClasses, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../../redux/reducers/rootReducer';
import Pulse from '../../pulse/Pulse';

interface NavbarItemProps {
	icon?: React.ReactNode | JSX.Element;
	label: string;
	to?: string;
	selectedTab: string;
	setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles({
	tab: {
		display: 'flex',
		width: '100%',
		marginBottom: tokens.spacingVerticalS,
		fontWeight: '700',
		...shorthands.padding('6px', tokens.spacingHorizontalS),
		...shorthands.borderRadius(tokens.borderRadiusLarge),
		...shorthands.gap(tokens.spacingHorizontalXS),
		'& svg': {
			width: '20px',
			height: '20px'
		},
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: tokens.colorNeutralBackground2Hover,
			'& svg': {
				color: tokens.colorBrandForeground1
			}
		}
	},
	tabSelected: {
		backgroundColor: tokens.colorNeutralBackground2Selected
	},
	tabActive: {
		color: tokens.colorPaletteRedForeground2,
		backgroundColor: tokens.colorPaletteRedBackground1,
		'&:hover': {
			color: tokens.colorPaletteRedForeground1,
			backgroundColor: tokens.colorPaletteRedBackground1,
			'& svg': {
				color: tokens.colorPaletteRedForeground1
			}
		}
	},
	tabActiveSelected: {
		color: tokens.colorPaletteRedForeground1,
		backgroundColor: tokens.colorPaletteRedBackground1,
		'&:hover': {
			color: tokens.colorPaletteRedForeground3,
			backgroundColor: tokens.colorPaletteRedBackground1,
			'& svg': {
				color: tokens.colorPaletteRedForeground3
			}
		}
	},
	label: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		height: '20px',
		fontSize: '12px',
		...shorthands.margin(0, 0, 0, tokens.spacingHorizontalXS)
	}
});

const NavbarItem = ({ label, icon, to, selectedTab, setSelectedTab }: NavbarItemProps) => {
	const classes = useStyles();
	const navigate = useNavigate();

	const route = to?.toLowerCase() ?? `/${label.toLowerCase()}`;

	const handleClick = () => {
		setSelectedTab(route);
		navigate(route);
	};

	// Check if current selected
	const selected = selectedTab === route;

	// If scene, check if active in OBS
	const { currentScene } = useSelector((state: AppState) => state.obsState);
	const active = label === currentScene;

	return (
		<div
			onClick={handleClick}
			className={
				selected
					? mergeClasses(
							classes.tab,
							active ? classes.tabActiveSelected : classes.tabSelected
						)
					: active
						? mergeClasses(classes.tab, classes.tabActive)
						: classes.tab
			}
		>
			{icon}
			<Body1 className={classes.label}>
				<span>{label}</span>
				{active && <Pulse />}
			</Body1>
		</div>
	);
};

export default NavbarItem;
