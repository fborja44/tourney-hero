import { DataField } from '@common/interfaces/Data';
import {
	Field,
	FieldProps,
	Input,
	InputProps,
	makeStyles,
	shorthands
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
	formField: {
		flexGrow: 1,
		'& label': {
			color: tokens.colorNeutralForeground3
		}
	},
	input: {
		minWidth: '80px',
		backgroundColor: tokens.colorNeutralBackground1,
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1)
	}
});

type FluentFieldProps = FieldProps & InputProps;

interface TextFieldProps extends FluentFieldProps {
	targetField: DataField;
	handleChange: (targetField: DataField, value: string) => void;
}

const TextField = ({
	label,
	value,
	placeholder,
	size,
	targetField,
	maxLength,
	handleChange
}: TextFieldProps) => {
	const classes = useStyles();
	return (
		<Field label={label} className={classes.formField} size={size}>
			<Input
				size={size}
				className={classes.input}
				placeholder={placeholder}
				value={value}
				onChange={(_ev, data) => handleChange(targetField, data.value)}
				maxLength={maxLength}
			/>
		</Field>
	);
};

TextField.defaultProps = {
	size: 'small'
};

export default TextField;
