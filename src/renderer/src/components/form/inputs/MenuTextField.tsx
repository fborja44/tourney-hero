import {
	Field,
	FieldProps,
	Input,
	InputOnChangeData,
	InputProps,
	makeStyles,
	mergeClasses,
	shorthands
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { ChangeEvent } from 'react';

const useStyles = makeStyles({
	formField: {
		flexGrow: 1,
		'& label': {
			color: tokens.colorNeutralForeground3
		},
		'& input:disabled': {
			color: tokens.colorNeutralForeground2
		}
	},
	input: {
		minWidth: '80px',
		backgroundColor: tokens.colorNeutralBackground1,
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1)
	}
});

type FluentFieldProps = FieldProps & InputProps;

interface MenuTextFieldProps extends FluentFieldProps {
	handleChange?: (ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
}

const MenuTextField = ({
	className,
	label,
	size = 'small',
	handleChange,
	validationState,
	validationMessage,
	required,
	...props
}: MenuTextFieldProps) => {
	const classes = useStyles();
	return (
		<Field
			label={label}
			className={mergeClasses(classes.formField, className)}
			size={size}
			validationMessage={validationMessage}
			validationState={validationState}
			required={required}
		>
			<Input size={size} className={classes.input} onChange={handleChange} {...props} />
		</Field>
	);
};

export default MenuTextField;
