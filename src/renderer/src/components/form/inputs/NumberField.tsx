import {
	Field,
	FieldProps,
	SpinButton,
	SpinButtonProps,
	makeStyles,
	shorthands
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { isInteger } from '../../../utils/string';
import { useState } from 'react';

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
		'&:before': {
			...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1)
		}
	}
});

type FluentFieldProps = FieldProps & SpinButtonProps;

interface NumberFieldProps extends FluentFieldProps {
	targetField: string;
	handleChange: (targetField: string, value: number) => void;
	suffix?: string;
}

const NumberField = ({
	label,
	value,
	placeholder,
	size,
	targetField,
	handleChange,
	min,
	max,
	suffix,
	style,
	disabled
}: NumberFieldProps) => {
	const classes = useStyles();

	const [prevValue, setPrevValue] = useState(0);

	return (
		<Field label={label} className={classes.formField} size={size} style={style}>
			<SpinButton
				size={size}
				className={classes.input}
				placeholder={placeholder}
				value={value}
				onChange={(_ev, data) => {
					let value = data.value ?? data.displayValue;
					if (!value) {
						value = 0;
					}
					if (!isInteger(`${value}`)) {
						value = prevValue;
					}
					handleChange(targetField, parseInt(value.toString()) ?? prevValue ?? 0);
					setPrevValue(parseInt(value.toString()) ?? prevValue ?? 0);
				}}
				min={min}
				max={max}
				displayValue={suffix ? `${value}${suffix}` : value?.toString()}
				disabled={disabled}
			/>
		</Field>
	);
};

NumberField.defaultProps = {
	size: 'small'
};

export default NumberField;
