import { DataField } from '@common/interfaces/Data';
import {
	Field,
	FieldProps,
	Radio,
	RadioGroup,
	RadioGroupProps,
	makeStyles
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { capitalize } from '@utils/string';

const useStyles = makeStyles({
	formField: {
		flexGrow: 1,
		'& label': {
			color: tokens.colorNeutralForeground3
		}
	}
});

type FluentFieldProps = FieldProps & RadioGroupProps;

interface RadioGroupFieldProps extends FluentFieldProps {
	items: string[];
	label: string;
	targetField: DataField;
	handleChange: (targetField: DataField, value: string) => void;
	playerNumber?: string;
}

const RadioGroupField = ({
	items,
	label,
	value,
	size,
	targetField,
	handleChange,
	playerNumber
}: RadioGroupFieldProps) => {
	const classes = useStyles();
	return (
		<Field label={label} className={classes.formField} size={size}>
			<RadioGroup
				value={value}
				onChange={(_ev, data) => handleChange(targetField, data.value)}
				layout="horizontal"
			>
				{items.map((item) => (
					<Radio value={item} label={capitalize(item)} key={item + playerNumber} />
				))}
			</RadioGroup>
		</Field>
	);
};

RadioGroupField.defaultProps = {
	size: 'small'
};

export default RadioGroupField;
