import { makeStyles } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
	formField: {
		flexGrow: 1,
		'& label': {
			color: tokens.colorNeutralForeground3
		}
	}
});

const PlaceholderField = () => {
	const classes = useStyles();
	return <div className={classes.formField} />;
};

export default PlaceholderField;
