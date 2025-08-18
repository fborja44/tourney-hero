import { shorthands, tokens, makeStyles, Caption1, Switch } from '@fluentui/react-components';
import {
	setAutomation,
	setAutoUpdateCharacters,
	setAutoUpdateScore
} from '@renderer/redux/actions/slippiActions';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';

// TODO: Consolidate menu styles
const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column'
	},
	menuTitle: {
		marginBottom: tokens.spacingVerticalXS
	},
	menuSection: {
		marginBottom: tokens.spacingVerticalS,
		':last-child': {
			marginBottom: 0
		}
	},
	label: {
		display: 'flex',
		alignItems: 'center',
		columnGap: tokens.spacingHorizontalXS,
		color: tokens.colorNeutralForeground3
	},
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		...shorthands.margin(tokens.spacingVerticalS, 0, 0, 0),
		'& button': {
			...shorthands.margin(0, tokens.spacingHorizontalM, 0, 0)
		}
	},
	input: {
		display: 'none'
	},
	inputButton: {
		width: 'fit-content',
		...shorthands.margin(tokens.spacingVerticalXS, 0),
		'&:hover': {
			cursor: 'pointer'
		},
		'& label:hover': {
			cursor: 'pointer'
		}
	},
	pathDisplay: {
		display: 'flex',
		flexDirection: 'column',
		textWrap: 'wrap',
		textOverflow: 'ellipsis',
		...shorthands.overflow('clip'),
		marginBottom: tokens.spacingVerticalXXS
	},
	switchContainer: {
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		right: '8px'
	},
	info: {
		cursor: 'pointer'
	},
	popover: {
		...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),
		maxWidth: '450px',
		textAlign: 'center'
	},
	disabled: {
		color: tokens.colorPaletteRedForeground2,
		fontStyle: 'italic'
	},
	portField: {
		marginBottom: tokens.spacingVerticalXS
	},
	caption: {
		fontStyle: 'italic',
		color: tokens.colorNeutralForeground3
	},
	switch: {
		position: 'relative',
		right: '8px',
		'& label': {
			fontSize: tokens.fontSizeBase200
		}
	}
});

const AutomationMenu = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { automate, autoUpdateScore, autoUpdateCharacters } = useSelector(
		(state: AppState) => state.slippiState
	);

	return (
		<>
			<div className={classes.container}>
				<Caption1 className={classes.menuTitle}>Automation Configuration</Caption1>
				<div className={classes.menuSection}>
					<Caption1 className={classes.label}>App Settings</Caption1>
					<Switch
						className={classes.switch}
						checked={automate}
						onChange={(_ev, data) => {
							dispatch(setAutomation(data.checked));
						}}
						label={automate ? 'Automation Enabled' : 'Automation Disabled'}
					/>
				</div>
				<div className={classes.menuSection}>
					<Caption1 className={classes.label}>Automation Settings</Caption1>
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
				</div>
			</div>
		</>
	);
};

export default AutomationMenu;
