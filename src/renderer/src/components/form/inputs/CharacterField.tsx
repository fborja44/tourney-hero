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
import { DataField } from '@common/interfaces/Data';
import { getSlippiCharacterByExternalId } from '@common/constants/slippi-utils';

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
	targetField: DataField;
	handleChange: (targetField: DataField, value: string | number | boolean | null) => void;
	playerNumber?: string;
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
						{value && parseInt(value) < 26 && (
							<CharacterIcon className={classes.icon} characterId={value} />
						)}
						<span>{getSlippiCharacterByExternalId(value)}</span>
					</div>
				}
				onOptionSelect={(_ev, data) => {
					handleChange(
						targetField,
						data.optionValue && data.optionValue !== 'Default'
							? parseInt(data.optionValue)
							: null
					);
				}}
				defaultValue="null"
			>
				{Array.from({ length: 26 }, (_, i) => i).map((characterId) => (
					<Option
						text={getSlippiCharacterByExternalId(characterId)}
						value={characterId.toString()}
						key={`${characterId}-${playerNumber}`}
					>
						{characterId < 26 && (
							<CharacterIcon className={classes.icon} characterId={characterId} />
						)}
						<span>{getSlippiCharacterByExternalId(characterId)}</span>
					</Option>
				))}
				<Option text={'Default'} value={undefined}>
					<span>Default</span>
				</Option>
			</Dropdown>
		</Field>
	);
};

CharacterField.defaultProps = {
	size: 'small'
};

export default CharacterField;
