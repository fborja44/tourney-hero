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

interface CommentatorDialogProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentatorDialog = ({ setOpen }: CommentatorDialogProps) => {
	const classes = useStyles();
	const ipcRenderer = window.electron.ipcRenderer;

	const [name, setName] = useState('');
	const [social, setSocial] = useState('');

	const handleSubmit = async () => {
		const result = await ipcRenderer.invoke('commentator:add', { name, social });
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
					<Subtitle2>Add New Commentator</Subtitle2>
				</DialogTitle>
				<DialogContent className={classes.form}>
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
