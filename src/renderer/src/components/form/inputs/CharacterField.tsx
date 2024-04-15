import {
	Dropdown,
	DropdownProps,
	Field,
	FieldProps,
	Option,
	makeStyles,
	shorthands
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import CharacterIcon from '../../character/CharacterIcon';
import { CHARACTERS } from '@common/constants/data';
import { characterToString } from '@utils/string';
import { Character } from '@common/interfaces/Types';

const useStyles = makeStyles({
	formField: {
		flexGrow: 1,
		'& label': {
			color: tokens.colorNeutralForeground3
		}
	},
	input: {
		height: '30px',
		minWidth: '80px',
		backgroundColor: tokens.colorNeutralBackground1,
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1),
		display: 'flex'
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
			marginRight: tokens.spacingHorizontalMNudge
		}
	}
});

type FluentFieldProps = FieldProps & DropdownProps;

interface CharacterFieldProps extends FluentFieldProps {
	targetField: string;
	handleChange: (targetField: string, value: Character) => void;
	playerNumber: string;
}

const CharacterField = ({
	label,
	value,
	size,
	targetField,
	handleChange,
	playerNumber
}: CharacterFieldProps) => {
	const classes = useStyles();

	return (
		<Field label={label} className={classes.formField} size={size}>
			<Dropdown
				size={size}
				className={classes.input}
				// @ts-expect-error !Ignoring type error to display custom value
				value={
					<div className={classes.display}>
						<CharacterIcon className={classes.icon} character={value as Character} />
						<span>{characterToString(value as Character)}</span>
					</div>
				}
				onOptionSelect={(_ev, data) =>
					handleChange(targetField, data.optionValue as Character)
				}
				defaultValue="Default"
			>
				{CHARACTERS.map((character) => (
					<Option
						text={characterToString(character)}
						value={character}
						key={character + playerNumber}
					>
						<CharacterIcon className={classes.icon} character={character} />
						<span>{characterToString(character)}</span>
					</Option>
				))}
			</Dropdown>
		</Field>
	);
};

CharacterField.defaultProps = {
	size: 'small'
};

export default CharacterField;
