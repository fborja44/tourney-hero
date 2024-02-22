import { Button, Tooltip, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Add16Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
	addButton: {
		width: '100%',
		maxWidth: '100%',
		color: tokens.colorNeutralForeground3,
		...shorthands.margin(tokens.spacingVerticalS, 0, 0, 0)
	}
});

const AddButton = () => {
	const classes = useStyles();

	return (
		<Tooltip relationship="label" content="Add New Scene" positioning="after" withArrow>
			<Button icon={<Add16Regular />} appearance="outline" className={classes.addButton} />
		</Tooltip>
	);
};

export default AddButton;
