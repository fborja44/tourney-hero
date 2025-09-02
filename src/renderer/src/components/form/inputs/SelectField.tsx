import { DataField } from '@common/interfaces/Data';
import {
	Select,
	Field,
	FieldProps,
	makeStyles,
	shorthands,
	SelectProps
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
		'& select': {
			height: '28px',
			minWidth: '80px',
			backgroundColor: tokens.colorNeutralBackground1,
			...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1),
			display: 'flex',
			position: 'relative',
			top: '1px'
		}
	},
	icon: {
		marginRight: tokens.spacingHorizontalSNudge
	},
	display: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		'& img': {
			marginLeft: tokens.spacingHorizontalXS,
			marginRight: tokens.spacingHorizontalM
		}
	}
});

type FluentFieldProps = FieldProps & SelectProps;

interface SelectFieldProps extends FluentFieldProps {
	options: string[];
	targetField: DataField;
	handleChange: (targetField: DataField, value: string) => void;
}

const SelectField = ({
	label,
	size = 'small',
	targetField,
	handleChange,
	options,
	...props
}: SelectFieldProps) => {
	const classes = useStyles();

	return (
		<Field label={label} className={classes.formField} size={size}>
			<Select
				size={size}
				className={classes.input}
				onChange={(_ev, data) => handleChange(targetField, data.value)}
				{...props}
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

export default SelectField;
