import { Body1 } from '@fluentui/react-components';
import TextField from './inputs/TextField';
import formStyles from './styles/FormStyles';
import RadioGroupField from './inputs/RadioGroupField';
import { PlayerData } from '../../interfaces/Data';
import NumberField from './inputs/NumberField';
import { updatePlayer } from '../../redux/actions/dataActions';
import { useDispatch, useSelector } from 'react-redux';
import CharacterField from './inputs/CharacterField';
import playerFormStyles from './styles/PlayerFormStyles';
import { AppState } from '../../redux/reducers/rootReducer';
import EntrantSelectField from './inputs/EntrantSelectField';
import {
	MAX_PRONOUN_LENGTH,
	MAX_SCORE,
	MAX_TAG_LENGTH,
	MAX_TEAM_LENGTH
} from '../../constants/limits';

interface PlayerFormProps {
	playerNumber: '1' | '2';
	playerData: PlayerData;
}

const PlayerForm = ({ playerNumber, playerData }: PlayerFormProps) => {
	const classes = formStyles();
	const playerFormClasses = playerFormStyles();
	const dispatch = useDispatch();

	/**
	 * On change handler. Updates the the target field in gameplay redux state.
	 * @param targetField
	 * @param value
	 */
	const handlePlayerChange = (targetField: string, value: string | number | boolean) => {
		dispatch(
			updatePlayer(`player${playerNumber}`, {
				[targetField]: value
			})
		);
	};

	const { entrantList } = useSelector((state: AppState) => state.tournamentState.entrants);

	return (
		<div
			className={`${classes.formSection} ${
				playerNumber === '1'
					? playerFormClasses.p1Background
					: playerFormClasses.p2Background
			}`}
		>
			<Body1 className={classes.sectionTitle}>Player {playerNumber}</Body1>
			<div className={classes.formRow}>
				{entrantList.length === 0 ? (
					<TextField
						label="Tag"
						value={playerData.tag}
						targetField="tag"
						handleChange={handlePlayerChange}
						placeholder={`Player ${playerNumber}`}
						maxLength={MAX_TAG_LENGTH}
					/>
				) : (
					<EntrantSelectField
						label="Entrant Selector / Tag"
						playerNumber={playerNumber}
						value={playerData.tag}
						placeholder={`Player ${playerNumber}`}
						maxLength={MAX_TAG_LENGTH}
					/>
				)}
			</div>
			<div className={classes.formRow}>
				<NumberField
					label="Tag Display Size"
					value={playerData.tagDisplaySize}
					targetField="tagDisplaySize"
					handleChange={handlePlayerChange}
					min={0}
					suffix=" px"
					disabled
				/>
				<span className={classes.gap} />
				<NumberField
					label="Score"
					value={playerData.score}
					targetField="score"
					handleChange={handlePlayerChange}
					min={0}
					max={MAX_SCORE}
				/>
			</div>
			<div className={classes.formRow}>
				<CharacterField
					label="Character"
					value={playerData.character}
					targetField="character"
					handleChange={handlePlayerChange}
					playerNumber={playerNumber}
				/>
			</div>
			<div className={classes.formRow}>
				<TextField
					label="Team / Prefix"
					value={playerData.team}
					targetField="team"
					handleChange={handlePlayerChange}
					placeholder={playerNumber === '1' ? 'C9' : 'TSM'}
					maxLength={MAX_TEAM_LENGTH}
				/>
			</div>
			<div className={classes.formRow}>
				<TextField
					label="Pronoun"
					value={playerData.pronoun}
					targetField="pronoun"
					handleChange={handlePlayerChange}
					placeholder={'he/him, she/her, they/them, etc.'}
					maxLength={MAX_PRONOUN_LENGTH}
				/>
			</div>
			<div className={classes.formRow}>
				<RadioGroupField
					label="Port / Team Color"
					value={playerData.port}
					targetField="port"
					handleChange={handlePlayerChange}
					items={['Red', 'Blue', 'Yellow', 'Green', 'None']}
					playerNumber={playerNumber}
				/>
			</div>
		</div>
	);
};

export default PlayerForm;
