import { Caption1, Switch } from '@fluentui/react-components';
import {
	setAutomation,
	setAutoUpdateCharacters,
	setAutoUpdateScore
} from '@renderer/redux/actions/slippiActions';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import ActionMenu, { ActionMenuSection } from '../ActionMenu';
import ActionMenuStyles from '../styles/ActionMenuStyles';
import useSocket from '@renderer/hooks/controls/useSocket';

const AutomationMenu = () => {
	const classes = ActionMenuStyles();
	const dispatch = useDispatch();

	const {
		connected: slippiConnected,
		automate,
		autoUpdateScore,
		autoUpdateCharacters
	} = useSelector((state: AppState) => state.slippiState);

	const { connected: socketConnected } = useSocket();

	return (
		<ActionMenu title="Automation Configuration">
			{!slippiConnected && (
				<Caption1 className={classes.disabled}>Missing Slippi Relay Connection</Caption1>
			)}
			{!socketConnected && (
				<Caption1 className={classes.disabled}>Missing Server Connection</Caption1>
			)}
			<ActionMenuSection label="App Settings">
				<Switch
					className={classes.switch}
					checked={automate}
					onChange={(_ev, data) => {
						dispatch(setAutomation(data.checked));
					}}
					label={automate ? 'Automation Enabled' : 'Automation Disabled'}
				/>
			</ActionMenuSection>
			<ActionMenuSection label="Automation Settings">
				<Switch
					className={classes.switch}
					label="Auto-Update Score"
					checked={autoUpdateScore}
					onChange={(_ev, data) => {
						dispatch(setAutoUpdateScore(data.checked));
					}}
					disabled={!automate}
				/>
				<Switch
					className={classes.switch}
					label="Auto-Update Characters"
					checked={autoUpdateCharacters}
					onChange={(_ev, data) => {
						dispatch(setAutoUpdateCharacters(data.checked));
					}}
					disabled={!automate}
				/>
			</ActionMenuSection>
		</ActionMenu>
	);
};

export default AutomationMenu;
