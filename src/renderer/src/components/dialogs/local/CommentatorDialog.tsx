import { LocalCommentator } from '@common/interfaces/Data';
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
import MenuTextField from '@renderer/components/form/inputs/MenuTextField';
import { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
	surface: {
		width: 'fit-content'
	},
	body: {
		width: '380px'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		rowGap: tokens.spacingVerticalS
	}
});

interface CommentatorDialogProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	data?: LocalCommentator;
}

const CommentatorDialog = ({ setOpen, data }: CommentatorDialogProps) => {
	const classes = useStyles();
	const ipcRenderer = window.electron.ipcRenderer;

	const [name, setName] = useState(data ? data.name : '');
	const [social, setSocial] = useState(data ? data.social : '');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async () => {
		setError(null);
		let result;
		if (data) {
			// Edit Mode
			result = await ipcRenderer.invoke('commentator:update', { id: data.id, name, social });
		} else {
			// Add mode
			result = await ipcRenderer.invoke('commentator:add', { id: uuidv4(), name, social });
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
					<Subtitle2>{data ? 'Edit Commentator' : 'Add New Commentator'}</Subtitle2>
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
						label="Commentator Name"
						value={name}
						handleChange={function (
							_ev: ChangeEvent<HTMLInputElement>,
							data: InputOnChangeData
						): void {
							setName(data.value);
						}}
						required
					/>
					<MenuTextField
						label="Social Media Handle"
						value={social}
						handleChange={function (
							_ev: ChangeEvent<HTMLInputElement>,
							data: InputOnChangeData
						): void {
							setSocial(data.value);
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

export default CommentatorDialog;
