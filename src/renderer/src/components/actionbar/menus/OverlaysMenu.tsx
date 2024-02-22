import { makeStyles, Caption1, tokens, Body1, shorthands } from '@fluentui/react-components';
import { Wrench20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
	container: {
		height: '100%'
	},
	heading: {
		display: 'block'
	},
	content: {
		color: tokens.colorNeutralForeground3,
		display: 'flex',
		flexDirection: 'column',
		height: '70%',
		alignItems: 'center',
		justifyContent: 'center',
		...shorthands.gap(tokens.spacingVerticalS)
	}
});

const OverlaysMenu = () => {
	const classes = useStyles();

	return (
		<>
			<div className={classes.container}>
				<Body1 className={classes.heading}>Overlays</Body1>
				<div className={classes.content}>
					<Wrench20Regular />
					<Caption1>Feature In Progress</Caption1>
				</div>
			</div>
		</>
	);
};

export default OverlaysMenu;
