import {
	Combobox,
	Field,
	FieldProps,
	makeStyles,
	shorthands,
	ComboboxProps,
	Option,
	SelectionEvents,
	OptionOnSelectData
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { getAllCountries, getCountryAlias } from '@renderer/utils/location';
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
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1),
		display: 'flex',
		position: 'relative',
		top: '1px',
		'& input': {
			width: '100%'
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

type FluentFieldProps = FieldProps & ComboboxProps;

interface CountryFieldProps extends FluentFieldProps {
	playerNumber?: '1' | '2';
	targetField: string;
	onOptionSelect: (event: SelectionEvents, data: OptionOnSelectData) => void;
}

const CountryField = ({
	label,
	size = 'small',
	value,
	playerNumber,
	onOptionSelect,
	...props
}: CountryFieldProps) => {
	const classes = useStyles();

	const countries = getAllCountries();

	const selectedValue = value;
	const [searchTerm, setSearchTerm] = useState(value ? getCountryAlias(value) : '');
	const [open, setOpen] = useState(false);

	return (
		<Field label={label} className={classes.formField} size={size}>
			<Combobox
				size={size}
				className={classes.input}
				value={open ? searchTerm : getCountryAlias(selectedValue)}
				freeform={false}
				onChange={(event) => {
					setSearchTerm(event.target.value);
					if (event.target.value === '') {
						onOptionSelect(event, {
							optionValue: undefined,
							optionText: undefined,
							selectedOptions: []
						});
					}
				}}
				onOpenChange={(_ev, data) => {
					setSearchTerm(getCountryAlias(selectedValue));
					setOpen(data.open);
				}}
				onOptionSelect={onOptionSelect}
				open={open}
				{...props}
			>
				{Object.keys(countries).map((code: string, i: number) => (
					<Option
						key={`${code}-${i}-${playerNumber ?? '0'}`}
						text={getCountryAlias(code)}
						value={code}
					>
						{getCountryAlias(code)}
					</Option>
				))}
			</Combobox>
		</Field>
	);
};

export default CountryField;
