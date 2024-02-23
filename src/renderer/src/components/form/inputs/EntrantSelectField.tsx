import {
	Combobox,
	Field,
	FieldProps,
	makeStyles,
	shorthands,
	ComboboxProps,
	Option
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducers/rootReducer';
import { Entrant } from '@common/interfaces/Types';
import { updatePlayer } from '../../../redux/actions/dataActions';
import { PlayerData } from '@common/interfaces/Data';

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
	playerNumber: '1' | '2';
}

const EntrantSelectField = ({
	label,
	placeholder,
	size,
	value,
	defaultValue,
	playerNumber,
	maxLength
}: EntrantSelectFieldProps) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { entrantList } = useSelector((state: AppState) => state.tournamentState.entrants);

	return (
		<Field label={label} className={classes.formField} size={size}>
			<Combobox
				size={size}
				className={classes.input}
				placeholder={placeholder}
				value={value}
				freeform
				onOptionSelect={(_ev, data) => {
					const player = entrantList.find((entrant) => entrant.id === data.optionValue);
					const playerData: Partial<PlayerData> = {
						tag: player?.tag ?? '',
						team: player?.team ?? '',
						pronoun: player?.pronoun ?? '',
						character: player?.character ?? 'Default'
					};
					dispatch(updatePlayer(`player${playerNumber}`, playerData));
				}}
				onChange={(event) => {
					dispatch(updatePlayer(`player${playerNumber}`, { tag: event.target.value }));
				}}
				defaultValue={defaultValue}
				maxLength={maxLength}
			>
				{entrantList.map((entrant: Entrant, i: number) => (
					<Option
						key={`${entrant.tag}-${i}-${playerNumber}`}
						text={entrant.tag}
						value={entrant.id}
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
