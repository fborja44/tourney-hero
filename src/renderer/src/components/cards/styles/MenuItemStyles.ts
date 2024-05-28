import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

const menuItemStyles = makeStyles({
	menuItemContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3),
		'&:hover': {
			backgroundColor: tokens.colorNeutralBackground3Hover,
			cursor: 'pointer'
		}
	},
	selected: {
		backgroundImage: `linear-gradient(90deg, ${tokens.colorBrandBackground2} 0%, ${tokens.colorNeutralBackground3} 80%)`,
		'&:hover': {
			backgroundImage: `linear-gradient(90deg, ${tokens.colorBrandBackground2} 0%, ${tokens.colorNeutralBackground3Hover} 80%)`
		}
	},
	menuItemBorder: {
		backgroundColor: tokens.colorStatusSuccessForeground1,
		height: '100%',
		width: '4px'
	},
	menuItemContent: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		...shorthands.padding(0, tokens.spacingHorizontalM)
	},
	menuItemActions: {
		display: 'flex',
		columnGap: tokens.spacingHorizontalS
	},
	playerContent: {
		display: 'flex',
		flexDirection: 'column',
		...shorthands.gap(tokens.spacingVerticalS)
	},
	matchInfo: {
		color: tokens.colorNeutralForeground2,
		textWrap: 'nowrap',
		whiteSpace: 'nowrap'
	},
	playerContainer: {
		height: '25px',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: tokens.spacingHorizontalS,
		backgroundColor: tokens.colorNeutralBackground1,
		...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
		...shorthands.borderRadius(tokens.borderRadiusMedium)
	},
	playerTagContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		paddingRight: tokens.spacingHorizontalS
	},
	playerScore: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '25px',
		fontSize: '13px',
		...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralStroke2)
	}
});

export default menuItemStyles;
