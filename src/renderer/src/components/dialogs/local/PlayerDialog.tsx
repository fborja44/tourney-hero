import { LocalPlayer } from '@common/interfaces/Data';
import { CharacterId } from '@common/interfaces/Types';
import {
	Button,
	DialogActions,
	DialogBody,
	DialogContent,
	DialogSurface,
	DialogTitle,
	InputOnChangeData,
	MessageBar,
	MessageBarBody,
	MessageBarTitle,
	Subtitle2,
	makeStyles,
	tokens
} from '@fluentui/react-components';
import MenuCharacterField from '@renderer/components/form/inputs/MenuCharacterField';
import MenuTextField from '@renderer/components/form/inputs/MenuTextField';
import { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
	surface: {
		width: 'fit-content'
	},
	body: {
		width: 'fit-content'
	},
	form: {
		display: 'flex',
		width: '380px',
		flexDirection: 'column',
		rowGap: tokens.spacingVerticalS
	}
});

interface PlayerDialogProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	data?: LocalPlayer;
}

const PlayerDialog = ({ setOpen, data }: PlayerDialogProps) => {
	const classes = useStyles();
	const ipcRenderer = window.electron.ipcRenderer;

	const [tag, setTag] = useState(data ? data.tag : '');
	const [team, setTeam] = useState(data ? data.team : '');
	const [characterId, setCharacterId] = useState<CharacterId>(data ? data.characterId ?? -1 : -1);
	const [pronoun, setPronoun] = useState(data ? data.pronoun : '');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async () => {
		setError(null);
		let result;
		if (data) {
			result = await ipcRenderer.invoke('player:update', {
				id: data.id,
				tag,
				characterId,
				team,
				pronoun
			});
		} else {
			result = await ipcRenderer.invoke('player:add', {
				id: uuidv4(),
				tag,
				characterId,
				team,
				pronoun
			});
		}
		console.log(result);
		if (result.error) {
			setError(result.error);
		} else {
			setOpen(false);
		}
		return result;
	};

	return (
		<DialogSurface className={classes.surface}>
			<DialogBody className={classes.body}>
				<DialogTitle>
					<Subtitle2>{data ? 'Edit Player' : 'Add New Player'}</Subtitle2>
				</DialogTitle>
				<DialogContent className={classes.form}>
					{error && (
						<MessageBar intent="error" layout="multiline">
							<MessageBarBody>
								<MessageBarTitle>Error</MessageBarTitle>
								{error}
							</MessageBarBody>
						</MessageBar>
					)}
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
						value={characterId?.toString()}
						handleChange={(_ev, data) =>
							setCharacterId(data.optionValue ? parseInt(data.optionValue) : null)
						}
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
