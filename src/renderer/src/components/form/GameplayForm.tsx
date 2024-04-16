import { Body1, Button, Tooltip, mergeClasses } from '@fluentui/react-components';
import Panel from '../panel/Panel';
import TextField from './inputs/TextField';
import formStyles from './styles/FormStyles';
import PlayerForm from './PlayerForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateGameplay, updatePlayer } from '@redux/actions/dataActions';
import { GameplayData } from '@common/interfaces/Data';
import { AppState } from '@redux/reducers/rootReducer';
import { ArrowSwapRegular } from '@fluentui/react-icons';
import { MAX_BRACKET_DATA_LENGTH } from '@common/constants/limits';
import CheckboxField from './inputs/CheckboxField';
// import CheckboxField from './inputs/CheckboxField';

const GameplayForm = () => {
	const classes = formStyles();
	const dispatch = useDispatch();

	const {
		player1,
		player2,
		matchType,
		roundName,
		bracketName,
		eventName,
		infoMsg,
		showCommentators
	}: GameplayData = useSelector((state: AppState) => state.dataState.gameplay);

	/**
	 * On change handler. Updates the the target field in gameplay redux state.
	 * @param targetField
	 * @param value
	 */
	const handleGameplayChange = (targetField: string, value: string | number | boolean) => {
		dispatch(
			updateGameplay({
				[targetField]: value
			})
		);
	};

	/**
	 * Swaps player form data.
	 */
	const handleSwapPlayers = () => {
		const tempPlayer1 = { ...player1 };
		dispatch(updatePlayer('player1', player2));
		dispatch(updatePlayer('player2', tempPlayer1));
	};

	return (
		<Panel>
			<div className={mergeClasses(classes.formSectionRow, classes.relative)}>
				<PlayerForm playerNumber="1" playerData={player1} />
				<PlayerForm playerNumber="2" playerData={player2} />
				<Tooltip content={'Swap Players'} relationship={'label'}>
					<Button
						icon={<ArrowSwapRegular />}
						className={classes.swapButton}
						appearance="secondary"
						onClick={handleSwapPlayers}
					/>
				</Tooltip>
			</div>
			<div className={classes.formSection}>
				<Body1 className={classes.sectionTitle}>General Information</Body1>
				<div className={classes.formRow}>
					<TextField
						label="Match Type"
						value={matchType}
						targetField={'matchType'}
						handleChange={handleGameplayChange}
						placeholder="Best of 3"
						maxLength={MAX_BRACKET_DATA_LENGTH}
					/>
					<span className={classes.gap} />
					<TextField
						label="Round Name"
						value={roundName}
						targetField={'roundName'}
						handleChange={handleGameplayChange}
						placeholder="Winners Round 1"
						maxLength={MAX_BRACKET_DATA_LENGTH}
					/>
					<span className={classes.gap} />
					<TextField
						label="Bracket Name"
						value={bracketName}
						targetField={'bracketName'}
						handleChange={handleGameplayChange}
						placeholder="Main Bracket"
						maxLength={MAX_BRACKET_DATA_LENGTH}
					/>
					<span className={classes.gap} />
				</div>
				<div className={classes.formRow}>
					<CheckboxField
						label="Show Comms."
						checked={showCommentators}
						targetField={'showCommentators'}
						handleChange={handleGameplayChange}
					/>
					<span className={classes.gap} />
					<TextField
						label="Event Name"
						value={eventName}
						targetField={'eventName'}
						handleChange={handleGameplayChange}
						placeholder="Melee Singles"
						maxLength={MAX_BRACKET_DATA_LENGTH}
					/>
					<span className={classes.gap} />
					<TextField
						label="Info Message"
						value={infoMsg}
						targetField={'infoMsg'}
						handleChange={handleGameplayChange}
						placeholder="start.gg/short-slug"
						maxLength={MAX_BRACKET_DATA_LENGTH}
					/>
				</div>
			</div>
			{/* <div className={classes.formSection}>
				<Body1 className={classes.sectionTitle}>Player Cam Information</Body1>
				<div className={classes.formRow}>
					<CheckboxField
						label="Show Match Info"
						checked={showPlayerCamInfo}
						targetField={'showPlayerCamInfo'}
						handleChange={handleGameplayChange}
					/>
				</div>
			</div> */}
		</Panel>
	);
};

export default GameplayForm;
