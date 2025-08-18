import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

const ActionMenuStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column'
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		rowGap: tokens.spacingVerticalMNudge
	},
	menuTitle: {
		marginBottom: tokens.spacingVerticalXS
	},
	label: {
		display: 'flex',
		alignItems: 'center',
		columnGap: tokens.spacingHorizontalXS,
		color: tokens.colorNeutralForeground3
	},
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: tokens.spacingHorizontalM,
		marginTop: tokens.spacingVerticalXS
	},
	input: {
		display: 'none'
	},
	inputButton: {
		width: 'fit-content',
		...shorthands.margin(tokens.spacingVerticalXS, 0),
		'&:hover': {
			cursor: 'pointer'
		},
		'& label:hover': {
			cursor: 'pointer'
		}
	},
	pathDisplay: {
		display: 'flex',
		flexDirection: 'column',
		textWrap: 'wrap',
		textOverflow: 'ellipsis',
		...shorthands.overflow('clip'),
		marginBottom: tokens.spacingVerticalXXS
	},
	switchContainer: {
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		right: '8px'
	},
	info: {
		cursor: 'pointer'
	},
	popover: {
		...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),
		maxWidth: '450px',
		textAlign: 'center'
	},
	disabled: {
		color: tokens.colorPaletteRedForeground2,
		fontStyle: 'italic'
	},
	caption: {
		fontStyle: 'italic',
		color: tokens.colorNeutralForeground3
	},
	switch: {
		position: 'relative',
		right: '8px',
		'& label': {
			fontSize: tokens.fontSizeBase200
		}
	}
});

export default ActionMenuStyles;
