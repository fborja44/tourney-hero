import { SLIPPI_CHARACTERS } from '@common/constants/data';
import { CharacterId } from '@common/interfaces/Types';
import {
	Button,
	DialogActions,
	DialogBody,
	DialogContent,
	DialogSurface,
	DialogTitle,
	Subtitle2,
	makeStyles,
	tokens
} from '@fluentui/react-components';
import CharacterIcon from '@renderer/components/character/CharacterIcon';

const useStyles = makeStyles({
	surface: {
		width: 'fit-content'
	},
	body: {
		width: '270px'
	},
	content: {
		display: 'grid',
		gridTemplateColumns: 'repeat(5, 1fr)',
		rowGap: tokens.spacingHorizontalM,
		columnGap: tokens.spacingVerticalL,
		alignContent: 'center',
		justifyItems: 'center',
		paddingTop: tokens.spacingVerticalM,
		paddingBottom: tokens.spacingVerticalM
	},
	button: {
		'&:hover': {
			filter: 'brightness(.60)'
		}
	}
});

interface CharacterSelectDialogProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleSelect: (characterId: CharacterId) => void;
}

const CharacterSelectDialog = ({ setOpen, handleSelect }: CharacterSelectDialogProps) => {
	const classes = useStyles();

	return (
		<DialogSurface className={classes.surface}>
			<DialogBody className={classes.body}>
				<DialogTitle>
					<Subtitle2>Add A Character</Subtitle2>
				</DialogTitle>
				<DialogContent className={classes.content}>
					{SLIPPI_CHARACTERS.sort((a, b) =>
						a.externalId !== null && b.externalId !== null
							? a.externalId - b.externalId
							: 0
					).map(
						(char) =>
							char.externalId !== null &&
							char.externalId !== 14 && (
								<Button
									key={`character-button-${char.externalId}`}
									icon={<CharacterIcon characterId={char.externalId} size={28} />}
									appearance="transparent"
									className={classes.button}
									onClick={() => {
										handleSelect(char.externalId);
										setOpen(false);
									}}
								/>
							)
					)}
				</DialogContent>
				<DialogActions>
					<Button appearance="secondary" size="small" onClick={() => setOpen(false)}>
						Cancel
					</Button>
				</DialogActions>
			</DialogBody>
		</DialogSurface>
	);
};

export default CharacterSelectDialog;
