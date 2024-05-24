import {
	Dropdown,
	DropdownProps,
	Field,
	FieldProps,
	Option,
	OptionOnSelectData,
	SelectionEvents,
	makeStyles,
	shorthands
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import CharacterIcon from '../../character/CharacterIcon';
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

interface MenuCharacterFieldProps extends FluentFieldProps {
	handleChange: (event: SelectionEvents, data: OptionOnSelectData) => void;
}

const MenuCharacterField = ({ label, value, size, handleChange }: MenuCharacterFieldProps) => {
	const classes = useStyles();

	return (
		<Field label={label} className={classes.formField} size={size}>
			<Dropdown
				size={size}
				className={classes.input}
				// @ts-expect-error !Ignoring type error to display custom value
				value={
					<div className={classes.display}>
						<CharacterIcon className={classes.icon} characterId={value} />
						<span>{getSlippiCharacterByExternalId(value)}</span>
					</div>
				}
				onOptionSelect={handleChange}
				defaultValue="Default"
			>
				{Array.from({ length: 27 }, (_, i) => i).map((characterId) => (
					<Option
						text={getSlippiCharacterByExternalId(characterId)}
						value={characterId.toString()}
						key={`${characterId}-local`}
					>
						{characterId < 26 && (
							<CharacterIcon className={classes.icon} characterId={characterId} />
						)}
						<span>{getSlippiCharacterByExternalId(characterId)}</span>
					</Option>
				))}
			</Dropdown>
		</Field>
	);
};

MenuCharacterField.defaultProps = {
	size: 'small'
};

export default MenuCharacterField;
