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
import { useSelector } from 'react-redux';
import { AppState } from '@redux/reducers/rootReducer';
import { Entrant } from '@common/interfaces/Types';

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

interface EntrantSelectFieldProps extends FluentFieldProps {
	playerNumber?: '1' | '2';
	onOptionSelect: (event: SelectionEvents, data: OptionOnSelectData) => void;
}

const EntrantSelectField = ({
	label,
	placeholder,
	size,
	value,
	defaultValue,
	playerNumber,
	maxLength,
	onOptionSelect,
	onChange
}: EntrantSelectFieldProps) => {
	const classes = useStyles();

	const { entrantList } = useSelector((state: AppState) => state.tournamentState.entrants);

	return (
		<Field label={label} className={classes.formField} size={size}>
			<Combobox
				size={size}
				className={classes.input}
				placeholder={placeholder}
				value={value}
				freeform
				onOptionSelect={onOptionSelect}
				onChange={onChange}
				defaultValue={defaultValue}
				maxLength={maxLength}
			>
				{entrantList.map((entrant: Entrant, i: number) => (
					<Option
						key={`${entrant.tag}-${i}-${playerNumber ?? '0'}`}
						text={entrant.tag}
						value={entrant.id.toString()}
					>
						{entrant.tag}
					</Option>
				))}
			</Combobox>
		</Field>
	);
};

EntrantSelectField.defaultProps = {
	size: 'small'
};

export default EntrantSelectField;
