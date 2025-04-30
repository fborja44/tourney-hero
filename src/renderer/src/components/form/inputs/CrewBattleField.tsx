import {
	Button,
	Dialog,
	DropdownProps,
	Field,
	FieldProps,
	makeStyles,
	shorthands
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { DataField } from '@common/interfaces/Data';
import { Add16Filled } from '@fluentui/react-icons';
import { useState } from 'react';
import CharacterSelectDialog from '@renderer/components/dialogs/input/CharacterSelectDialog';
import { CharacterId } from '@common/interfaces/Types';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import CharacterToken from './CharacterToken';

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
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		rowGap: tokens.spacingHorizontalM,
		columnGap: tokens.spacingVerticalL,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: tokens.spacingVerticalM,
		paddingBottom: tokens.spacingVerticalM
	}
});

type FluentFieldProps = FieldProps & DropdownProps;

interface CrewBattleFieldProps extends FluentFieldProps {
	targetField: DataField;
	handleChange: (
		targetField: DataField,
		value: string | number | number[] | boolean | null
	) => void;
	playerNumber: '1' | '2';
}

const CrewBattleField = ({
	label,
	size,
	targetField,
	handleChange,
	playerNumber
}: CrewBattleFieldProps) => {
	const classes = useStyles();

	const { player1, player2 } = useSelector((state: AppState) => state.dataState.gameplay);

	const headsList = playerNumber === '1' ? player1.heads : player2.heads;

	const [open, setOpen] = useState(false);

	const handleCharacterSelect = (characterId: CharacterId) => {
		if (characterId === null) return;
		handleChange(targetField, [...(headsList as number[]), characterId]);
	};

	const handleCharacterRemove = (index: number) => {
		const updatedList = [...(headsList as number[])];
		updatedList.splice(index, 1);
		handleChange(targetField, updatedList);
	};

	return (
		<Field label={label} className={classes.formField} size={size}>
			<Dialog open={open}>
				<Button
					icon={<Add16Filled />}
					iconPosition="after"
					size="small"
					onClick={() => setOpen(true)}
					className={classes.input}
				>
					Add Character
				</Button>
				<CharacterSelectDialog setOpen={setOpen} handleSelect={handleCharacterSelect} />
			</Dialog>
			<div className={classes.content}>
				{headsList.map(
					(characterId, i) =>
						characterId !== null && (
							<CharacterToken
								key={`head-token-${characterId}-${playerNumber}-${i}`}
								characterId={characterId}
								handleRemove={handleCharacterRemove}
								index={i}
							/>
						)
				)}
			</div>
		</Field>
	);
};

CrewBattleField.defaultProps = {
	size: 'small'
};

export default CrewBattleField;
