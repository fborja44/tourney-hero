import { Body1, Button, OptionOnSelectData, Tag, mergeClasses } from '@fluentui/react-components';
import TextField from './inputs/TextField';
import formStyles from './styles/FormStyles';
import RadioGroupField from './inputs/RadioGroupField';
import { PlayerData } from '@common/interfaces/Data';
import NumberField from './inputs/NumberField';
import { useSelector } from 'react-redux';
import CharacterField from './inputs/CharacterField';
import playerFormStyles from './styles/PlayerFormStyles';
import { AppState } from '@redux/reducers/rootReducer';
import EntrantSelectField from './inputs/EntrantSelectField';
import {
	MAX_PRONOUN_LENGTH,
	MAX_SCORE,
	MAX_SEED,
	MAX_TAG_LENGTH,
	MAX_TEAM_LENGTH,
	MIN_SCORE
} from '@common/constants/limits';
import { Port } from '@common/interfaces/Types';
import CountryField from './inputs/CountryField';
import CrewBattleField from './inputs/CrewBattleField';
import useOverlayControls from '@hooks/controls/useOverlayControls';
import useLocalPlayers from '@renderer/hooks/data/useLocalPlayers';

interface PlayerFormProps {
	playerNumber: '1' | '2';
	playerData: PlayerData;
}

const PlayerForm = ({ playerNumber, playerData }: PlayerFormProps) => {
	const classes = formStyles();
	const playerClasses = playerFormStyles();

	const { entrantList } = useSelector((state: AppState) => state.tournamentState.entrants);

	const { createPlayerFormChangeHandler, handlePlayerChange } = useOverlayControls();

	const handlePlayerFieldChange = createPlayerFormChangeHandler(playerNumber);

	/**
	 * Gets the appropriate port color background.
	 * @param port The player's port
	 * @returns The port color class.
	 */
	const getPortColor = (port: Port) => {
		switch (port) {
			case 'Red':
				return playerClasses.port1;
			case 'Blue':
				return playerClasses.port2;
			case 'Yellow':
				return playerClasses.port3;
			case 'Green':
				return playerClasses.port4;
			default:
				return '';
		}
	};
	const { playersList } = useLocalPlayers();

	const handleEntrantSelect = (_ev, data) => {
		const player = entrantList.find((entrant) => entrant.id.toString() === data.optionValue);
		const localPlayer = playersList.find((player) => player.tag === data.optionText);

		const playerData: Partial<PlayerData> = {
			tag: localPlayer?.tag ?? player?.tag ?? '',
			team: localPlayer?.team ?? player?.team ?? '',
			pronoun: localPlayer?.pronoun ?? player?.pronoun ?? '',
			characterId: localPlayer?.characterId ?? player?.characterId ?? null
		};

		handlePlayerChange(`player${playerNumber}`, playerData);
	};

	const handleTagChange = (event) => {
		handlePlayerFieldChange('tag', event.target.value);
	};

	const handleCountrySelect = (_ev, data: OptionOnSelectData) => {
		handlePlayerFieldChange('countryCode', data.optionValue ?? '??');
	};

	return (
		<div
			className={mergeClasses(
				classes.formSection,
				playerNumber === '1' ? playerClasses.p1Section : playerClasses.p2Section,
				getPortColor(playerData.port)
			)}
		>
			<div className={classes.sectionTitleContainer}>
				<Body1 className={classes.sectionTitle}>Player {playerNumber}</Body1>
				{playerData.luckyStats && (
					<div className={classes.luckyStatsContainer}>
						{playerData.luckyStats?.rank !== null && (
							<Tag>Lucky Rank: {playerData.luckyStats.rank}</Tag>
						)}
						{playerData.luckyStats?.elo !== null && (
							<Tag>Elo: {Math.round(playerData.luckyStats.elo)}</Tag>
						)}
					</div>
				)}
			</div>
			<div className={classes.formRow}>
				{entrantList.length === 0 ? (
					<TextField
						label="Tag"
						value={playerData.tag}
						targetField="tag"
						handleChange={handlePlayerFieldChange}
						placeholder={`Player ${playerNumber}`}
						maxLength={MAX_TAG_LENGTH}
					/>
				) : (
					<EntrantSelectField
						label="Entrant Selector / Tag"
						onOptionSelect={handleEntrantSelect}
						onChange={handleTagChange}
						value={playerData.tag}
						placeholder={`Player ${playerNumber}`}
						maxLength={MAX_TAG_LENGTH}
					/>
				)}
			</div>
			<div className={classes.formRow}>
				<NumberField
					label="Seed"
					value={playerData.seed}
					targetField="seed"
					handleChange={handlePlayerFieldChange}
					min={0}
					max={MAX_SEED}
				/>
				<NumberField
					label="Score"
					value={playerData.score}
					targetField="score"
					handleChange={handlePlayerFieldChange}
					min={MIN_SCORE}
					max={MAX_SCORE}
				/>
			</div>
			<div className={classes.formRow}>
				<Button
					onClick={() => handlePlayerFieldChange('seed', 0)}
					size="small"
					iconPosition="after"
					className={classes.resetButton}
					appearance="primary"
				>
					Hide Seed
				</Button>
				<Button
					onClick={() => handlePlayerFieldChange('score', 0)}
					size="small"
					iconPosition="after"
					className={classes.resetButton}
					appearance="primary"
				>
					Reset Player Score
				</Button>
			</div>
			<div className={classes.formRow}>
				<CharacterField
					label="Character"
					value={playerData.characterId?.toString()}
					targetField="characterId"
					handleChange={handlePlayerFieldChange}
					playerNumber={playerNumber}
				/>
			</div>
			<div className={classes.formRow}>
				<CountryField
					label="Country"
					value={playerData.countryCode}
					targetField="country"
					onOptionSelect={handleCountrySelect}
					playerNumber={playerNumber}
				/>
			</div>
			<div className={classes.formRow}>
				<TextField
					label="Team / Prefix"
					value={playerData.team}
					targetField="team"
					handleChange={handlePlayerFieldChange}
					placeholder={playerNumber === '1' ? 'C9' : 'TSM'}
					maxLength={MAX_TEAM_LENGTH}
				/>
			</div>
			<div className={classes.formRow}>
				<TextField
					label="Pronoun"
					value={playerData.pronoun}
					targetField="pronoun"
					handleChange={handlePlayerFieldChange}
					placeholder={'he/him, she/her, they/them, etc.'}
					maxLength={MAX_PRONOUN_LENGTH}
				/>
			</div>
			<div className={classes.formRow}>
				<RadioGroupField
					label="Port / Team Color"
					value={playerData.port}
					targetField="port"
					handleChange={handlePlayerFieldChange}
					items={['Red', 'Blue', 'Yellow', 'Green', 'None']} // or 'None'
					playerNumber={playerNumber}
				/>
			</div>
			<div className={classes.formRow}>
				<CrewBattleField
					label="Crew Battle / Stocks"
					targetField="heads"
					handleChange={handlePlayerFieldChange}
					playerNumber={playerNumber}
				/>
			</div>
		</div>
	);
};

export default PlayerForm;
