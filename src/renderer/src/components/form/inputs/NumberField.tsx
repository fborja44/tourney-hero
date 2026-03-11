import { DataField } from '@common/interfaces/Data';
import {
	Field,
	FieldProps,
	SpinButton,
	SpinButtonProps,
	makeStyles,
	shorthands
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { isInteger } from '@utils/string';
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
	targetField: DataField | string;
	handleChange: (targetField: DataField | string, value: number) => void;
	suffix?: string;
	precision?: number;
}

const NumberField = ({
	label,
	size = 'small',
	style,
	targetField,
	suffix,
	value,
	handleChange,
	precision = 0,
	...props
}: NumberFieldProps) => {
	const classes = useStyles();

	const [prevValue, setPrevValue] = useState(0);

	return (
		<Field label={label} className={classes.formField} size={size} style={style}>
			<SpinButton
				size={size}
				className={classes.input}
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
				value={value ?? null}
				displayValue={
					suffix
						? `${value?.toFixed(precision)}${suffix}`
						: value?.toFixed(precision).toString()
				}
				{...props}
			/>
		</Field>
	);
};

export default NumberField;
