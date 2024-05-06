import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { cardWidth } from '../../card/Card';

const dashboardStyles = makeStyles({
	listContainer: {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}, 1fr))`,
		...shorthands.gap(tokens.spacingHorizontalXL, tokens.spacingVerticalXL),
		justifyItems: 'center'
	},
	empty: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		color: tokens.colorNeutralForeground2
	}
});

export default dashboardStyles;
