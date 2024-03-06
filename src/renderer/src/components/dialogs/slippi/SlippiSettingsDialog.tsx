import {
	Body1,
	Button,
	DialogActions,
	DialogBody,
	DialogContent,
	DialogSurface,
	DialogTitle,
	DialogTrigger,
	Divider,
	Subtitle2,
	Switch,
	makeStyles,
	tokens,
	useToastController
} from '@fluentui/react-components';
import MessageToast from '@renderer/components/toasts/MessageToast';
import {
	setAutoUpdateCharacters,
	setAutoUpdateScore,
	setAutomation
} from '@renderer/redux/actions/slippiActions';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
	body: {
		display: 'flex',
		flexDirection: 'column',
		rowGap: tokens.spacingVerticalS
	},
	section: {
		display: 'flex',
		flexDirection: 'column',
		rowGap: tokens.spacingVerticalS
	},
	sectionTitle: {
		color: tokens.colorNeutralForeground2
	}
});

const SlippiSettingsDialog = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { dispatchToast } = useToastController('toaster');

	const { automate, autoUpdateScore, autoUpdateCharacters } = useSelector(
		(state: AppState) => state.slippiState
	);

	const [automateSlippi, setAutomateSlippi] = useState(automate);
	const [updateScore, setUpdateScore] = useState(autoUpdateScore);
	const [updateCharacters, setUpdateCharacters] = useState(autoUpdateCharacters);

	const handleSaveSettings = () => {
		dispatch(setAutomation(automateSlippi));
		dispatch(setAutoUpdateScore(updateScore));
		dispatch(setAutoUpdateCharacters(updateCharacters));
		dispatchToast(<MessageToast title={'Updated Automation Settings'} />, {
			intent: 'success'
		});
	};

	return (
		<DialogSurface>
			<DialogBody>
				<DialogTitle>
					<Subtitle2>Slippi Automation Settings</Subtitle2>
				</DialogTitle>
				<DialogContent className={classes.body}>
					<div className={classes.section}>
						<Body1 className={classes.sectionTitle}>App Settings</Body1>
						<Switch
							label="Enable Slippi Automation"
							checked={automateSlippi}
							onChange={(_ev, data) => {
								setAutomateSlippi(data.checked);
							}}
						/>
					</div>
					<Divider />
					<div className={classes.section}>
						<Body1 className={classes.sectionTitle}>Automation Settings</Body1>
						<Switch
							label="Auto-Update Score"
							checked={updateScore}
							onChange={(_ev, data) => {
								setUpdateScore(data.checked);
							}}
						/>
						<Switch
							label="Auto-Update Characters"
							checked={updateCharacters}
							onChange={(_ev, data) => {
								setUpdateCharacters(data.checked);
							}}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<DialogTrigger disableButtonEnhancement>
						<Button appearance="secondary">Cancel</Button>
					</DialogTrigger>
					<DialogTrigger disableButtonEnhancement>
						<Button appearance="primary" onClick={handleSaveSettings}>
							Save Settings
						</Button>
					</DialogTrigger>
				</DialogActions>
			</DialogBody>
		</DialogSurface>
	);
};

export default SlippiSettingsDialog;
