import { makeStyles, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import breakpoints from '@utils/breakpoints';

const FormStyles = makeStyles({
	sectionTitle: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		color: tokens.colorNeutralForeground1,
		fontWeight: tokens.fontWeightRegular,
		...shorthands.margin(tokens.spacingVerticalM, 0, tokens.spacingVerticalM, 0)
	},
	formSectionRow: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3),
		...breakpoints.lg({
			flexDirection: 'column'
		}),
		...breakpoints.md({
			flexDirection: 'column'
		})
	},
	formSection: {
		width: '100%',
		boxSizing: 'border-box',
		...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalXL)
	},
	formSectionLeft: {
		...breakpoints.xl({
			...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke3)
		}),
		...breakpoints.lg({
			...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3)
		}),
		...breakpoints.md({
			...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3)
		})
	},
	formRowSingle: {
		display: 'flex',
		flexDirection: 'row',
		...shorthands.margin(0, 0, tokens.spacingHorizontalL, 0),
		width: '400px'
	},
	formRow: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		...shorthands.margin(0, 0, tokens.spacingHorizontalL, 0)
	},
	formField: {
		'& label': {
			color: tokens.colorNeutralForeground3
		}
	},
	gap: {
		width: tokens.spacingHorizontalXL
	},
	button: {
		...shorthands.margin(0, tokens.spacingHorizontalL, 0, 0)
	},
	borderBottom: {
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3)
	},
	relative: {
		position: 'relative'
	},
	swapButton: {
		width: '24px',
		height: '32px',
		position: 'absolute',
		left: 'calc(50% - 15px)',
		top: 'calc(100% - 20px)',
		color: tokens.colorBrandForeground1,
		...shorthands.borderRadius('100px'),
		'& span': {
			width: '16px',
			height: '16px'
		},
		'&:hover': {
			color: tokens.colorBrandForeground1
		},
		...breakpoints.lg({
			top: 'calc(50% - 17px)',
			transform: 'rotate(90deg)'
		}),
		...breakpoints.md({
			top: 'calc(50% - 17px)',
			transform: 'rotate(90deg)'
		})
	},
	spacing: {
		...shorthands.padding(tokens.spacingVerticalM, 0)
	}
});

export default FormStyles;
