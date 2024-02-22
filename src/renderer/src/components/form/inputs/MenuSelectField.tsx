import {
	Field,
	FieldProps,
	InputOnChangeData,
	Select,
	SelectProps,
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
		'& select': {
			minWidth: '80px',
			backgroundColor: tokens.colorNeutralBackground1,
			...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1)
		}
	}
});

type FluentFieldProps = FieldProps & SelectProps;

interface MenuSelectFieldProps extends FluentFieldProps {
	options: string[];
	handleChange: (ev: ChangeEvent<HTMLSelectElement>, data: InputOnChangeData) => void;
}

const MenuSelectField = ({
	className,
	label,
	value,
	options,
	size,
	handleChange,
	validationState,
	validationMessage,
	disabled
}: MenuSelectFieldProps) => {
	const classes = useStyles();
	return (
		<Field
			label={label}
			className={mergeClasses(classes.formField, className)}
			size={size}
			validationMessage={validationMessage}
			validationState={validationState}
		>
			<Select
				size={size}
				className={classes.input}
				disabled={disabled}
				value={value}
				onChange={handleChange}
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</Select>
		</Field>
	);
};

MenuSelectField.defaultProps = {
	size: 'small'
};

export default MenuSelectField;
