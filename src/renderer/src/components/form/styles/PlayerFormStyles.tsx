import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import breakpoints from '@renderer/utils/breakpoints';

const playerFormStyles = makeStyles({
	p1Background: {
		backgroundImage:
			'linear-gradient(180deg, rgba(63, 16, 17, 0.75) 0%, rgba(63, 16, 17, 0.00) 100%)',
		...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke3),
		...breakpoints.lg({
			...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3)
		}),
		...breakpoints.md({
			...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3)
		})
	},
	p2Background: {
		backgroundImage: 'linear-gradient(180deg, #032B49 0%, rgba(3, 43, 73, 0.00) 100%)'
	}
});

export default playerFormStyles;
