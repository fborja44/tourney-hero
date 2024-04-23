import { DataField } from '@common/interfaces/Data';
import { Checkbox, Field, FieldProps, CheckboxProps, makeStyles } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
	formField: {
		width: '100px',
		textAlign: 'center',
		'& label': {
			color: tokens.colorNeutralForeground3
		}
	},
	checkbox: {
		justifySelf: 'center'
	}
});

type FluentFieldProps = FieldProps & CheckboxProps;

interface CheckboxFieldProps extends FluentFieldProps {
	label: string;
	targetField: DataField;
	handleChange: (targetField: DataField, value: string | boolean) => void;
	playerNumber?: string;
}

const CheckboxField = ({
	label,
	checked,
	placeholder,
	size,
	targetField,
	handleChange,
	style,
	disabled
}: CheckboxFieldProps) => {
	const classes = useStyles();
	return (
		<Field label={label} className={classes.formField} size={size} style={style}>
			<Checkbox
				className={classes.checkbox}
				placeholder={placeholder}
				checked={checked}
				onChange={(_ev, data) => handleChange(targetField, data.checked)}
				disabled={disabled}
			/>
		</Field>
	);
};

CheckboxField.defaultProps = {
	size: 'small'
};

export default CheckboxField;
