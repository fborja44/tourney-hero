import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

const cardStyles = makeStyles({
	cardTitle: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		...shorthands.padding(tokens.spacingVerticalS, 0),
		width: '100%',
		height: '42px'
	},
	splitFooter: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	cardButton: {
		height: 'fit-content'
	},
	textContent: {
		display: 'flex',
		flexDirection: 'column',
		...shorthands.padding(tokens.spacingVerticalS, 0)
	},
	textContentRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	textIcon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: tokens.spacingHorizontalXS,
		'& svg': {
			width: '13px',
			height: '13px'
		}
	}
});

export default cardStyles;
