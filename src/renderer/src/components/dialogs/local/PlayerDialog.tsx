import { Character } from '@common/interfaces/Types';
import {
	Button,
	DialogActions,
	DialogBody,
	DialogContent,
	DialogSurface,
	DialogTitle,
	InputOnChangeData,
	Subtitle2,
	makeStyles,
	tokens
} from '@fluentui/react-components';
import MenuCharacterField from '@renderer/components/form/inputs/MenuCharacterField';
import MenuTextField from '@renderer/components/form/inputs/MenuTextField';
import { ChangeEvent, useState } from 'react';

const useStyles = makeStyles({
	surface: {
		width: 'fit-content'
	},
	body: {
		width: '300px'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		rowGap: tokens.spacingVerticalS
	}
});

interface PlayerDialogProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayerDialog = ({ setOpen }: PlayerDialogProps) => {
	const classes = useStyles();
	const ipcRenderer = window.electron.ipcRenderer;

	const [tag, setTag] = useState('');
	const [team, setTeam] = useState('');
	const [character, setCharacter] = useState<Character>('Default');
	const [pronoun, setPronoun] = useState('');

	const handleSubmit = async () => {
		const result = await ipcRenderer.invoke('player:add', {
			tag,
			character,
			team,
			pronoun
		});
		console.log(result);
		if (!result) {
			// TODO: Handle error
		}
		setOpen(false);
		return result;
	};

	return (
		<DialogSurface className={classes.surface}>
			<DialogBody className={classes.body}>
				<DialogTitle>
					<Subtitle2>Add New Player</Subtitle2>
				</DialogTitle>
				<DialogContent className={classes.form}>
					<MenuTextField
						label="Player Tag"
						value={tag}
						handleChange={function (
							_ev: ChangeEvent<HTMLInputElement>,
							data: InputOnChangeData
						): void {
							setTag(data.value);
						}}
						required
					/>
					<MenuCharacterField
						label="Character"
						value={character}
						handleChange={(_ev, data) => setCharacter(data.optionValue as Character)}
					/>
					<MenuTextField
						label="Team Abbr."
						value={team}
						handleChange={function (
							_ev: ChangeEvent<HTMLInputElement>,
							data: InputOnChangeData
						): void {
							setTeam(data.value);
						}}
					/>
					<MenuTextField
						label="Pronoun"
						value={pronoun}
						handleChange={function (
							_ev: ChangeEvent<HTMLInputElement>,
							data: InputOnChangeData
						): void {
							setPronoun(data.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button appearance="secondary" size="small" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button appearance="primary" size="small" onClick={handleSubmit}>
						Submit
					</Button>
				</DialogActions>
			</DialogBody>
		</DialogSurface>
	);
};

export default PlayerDialog;
