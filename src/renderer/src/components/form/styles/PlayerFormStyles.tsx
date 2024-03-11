import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import breakpoints from '@renderer/utils/breakpoints';

const playerFormStyles = makeStyles({
	p1Section: {
		backgroundImage:
			'linear-gradient(180deg, rgba(63, 16, 17, 0.75) 0%, rgba(63, 16, 17, 0.00) 100%)',
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
	p2Section: {
		backgroundImage: 'linear-gradient(180deg, #032B49 0%, rgba(3, 43, 73, 0.00) 100%)'
	},
	port1: {
		backgroundImage:
			'linear-gradient(180deg, rgba(63, 16, 17, 0.75) 0%, rgba(63, 16, 17, 0.00) 100%)'
	},
	port2: {
		backgroundImage: 'linear-gradient(180deg, #032B49 0%, rgba(3, 43, 73, 0.00) 100%)'
	},
	port3: {
		backgroundImage:
			'linear-gradient(180deg, rgba(91, 65, 14, 0.75) 0%, rgba(63, 16, 17, 0.00) 100%)'
	},
	port4: {
		backgroundImage: 'linear-gradient(180deg, #113F23 0%, rgba(3, 43, 73, 0.00) 100%)'
	}
});

export default playerFormStyles;
