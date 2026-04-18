import { Body1, Button, OptionOnSelectData, mergeClasses } from '@fluentui/react-components';
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
import { LuckyStatsPlayerItem } from '@common/interfaces/ApiData';
import useLuckyStats from '@renderer/hooks/luckystats/useLuckyStats';

interface PlayerFormProps {
	playerNumber: '1' | '2';
	playerData: PlayerData;
}

const PlayerForm = ({ playerNumber, playerData }: PlayerFormProps) => {
	const classes = formStyles();
	const playerClasses = playerFormStyles();

	const { player1, player2 } = useSelector((state: AppState) => state.dataState.gameplay);
	const { entrantList } = useSelector((state: AppState) => state.tournamentState.entrants);

	const { createPlayerFormChangeHandler, handlePlayerChange } = useOverlayControls();

	const { isEnabled: luckyStatsIsEnabled } = useSelector(
		(state: AppState) => state.luckyStatsState
	);

	const { fetchLuckyStatsPlayerData, setMatchupData } = useLuckyStats();

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

	const handleEntrantSelect = async (_ev, data) => {
		const player = entrantList.find((entrant) => entrant.id.toString() === data.optionValue);
		const localPlayer = playersList.find((player) => player.tag === data.optionText);

		let luckyStatsPlayer: LuckyStatsPlayerItem | null = null;
		if (luckyStatsIsEnabled && player?.userId) {
			const response = await fetchLuckyStatsPlayerData([player.userId]);

			const players = response?.data?.players ?? [];
			if (players.length > 0) {
				luckyStatsPlayer = players[0];
			}
		}

		const playerData: Partial<PlayerData> = {
			startggId: player?.userId ?? null,
			tag: localPlayer?.tag ?? player?.tag ?? '',
			team: localPlayer?.team ?? player?.team ?? '',
			pronoun: localPlayer?.pronoun ?? player?.pronoun ?? '',
			characterId: localPlayer?.characterId ?? player?.characterId ?? null,
			seed: player?.seed ?? null,
			luckyStats: luckyStatsPlayer
				? {
						elo: luckyStatsPlayer.elo ?? null,
						rank: luckyStatsPlayer.luckyRank?.rank ?? null,
						points: luckyStatsPlayer.luckyRank?.points ?? null
					}
				: null,
			countryCode: localPlayer?.countryCode ?? 'US'
		};

		handlePlayerChange(`player${playerNumber}`, playerData);

		// Check if both players have a startggId and fetch matchup data if so
		const player1Id = playerNumber === '1' ? playerData.startggId : player1.startggId;
		const player2Id = playerNumber === '2' ? playerData.startggId : player2.startggId;
		if (luckyStatsIsEnabled) {
			await setMatchupData(player1Id, player2Id);
		}
	};

	const handleRefreshLuckyStats = async () => {
		const playerId = playerData.startggId;

		if (!luckyStatsIsEnabled || !playerId) {
			return;
		}

		let luckyStatsPlayer: LuckyStatsPlayerItem | null = null;
		const response = await fetchLuckyStatsPlayerData([playerId]);

		const players = response?.data?.players ?? [];
		if (players.length > 0) {
			luckyStatsPlayer = players[0];
		}

		handlePlayerChange(`player${playerNumber}`, {
			luckyStats: luckyStatsPlayer
				? {
						elo: luckyStatsPlayer.elo ?? null,
						rank: luckyStatsPlayer.luckyRank?.rank ?? null,
						points: luckyStatsPlayer.luckyRank?.points ?? null
					}
				: null
		});
	};

	const handleTagChange = (event) => {
		handlePlayerFieldChange('tag', event.target.value);
	};

	const handleCountrySelect = (_ev, data: OptionOnSelectData) => {
		handlePlayerFieldChange('countryCode', data.optionValue ?? null);
	};

	const handleToggleShowStats = () => {
		handlePlayerFieldChange('showStats', !playerData.showStats);
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
			{luckyStatsIsEnabled && (
				<div className={classes.formRow}>
					<NumberField
						label="Lucky Rank"
						value={playerData.luckyStats?.rank}
						targetField="luckyStats.rank"
						handleChange={handlePlayerFieldChange}
						min={0}
						max={MAX_SEED}
					/>
					<NumberField
						label="Lucky Rank Points"
						value={playerData.luckyStats?.points}
						targetField="luckyStats.points"
						handleChange={handlePlayerFieldChange}
						min={MIN_SCORE}
						// max={MAX_SCORE}
					/>
					<NumberField
						label="Lucky Rank Elo"
						value={playerData.luckyStats?.elo}
						targetField="luckyStats.elo"
						handleChange={handlePlayerFieldChange}
						min={MIN_SCORE}
						// max={MAX_SCORE}
						precision={2}
					/>
				</div>
			)}
			<div className={classes.formRow}>
				{/* TODO */}
				<Button
					onClick={() =>
						handlePlayerChange(`player${playerNumber}`, {
							luckyStats: null
						})
					}
					size="small"
					iconPosition="after"
					className={classes.resetButton}
					appearance="primary"
				>
					Clear Lucky Stats
				</Button>
				{/* TODO */}
				<Button
					onClick={handleToggleShowStats}
					size="small"
					iconPosition="after"
					className={classes.resetButton}
					appearance="primary"
				>
					{playerData.showStats ? 'Showing' : 'Hiding'} Stats
				</Button>
				<Button
					onClick={() => handleRefreshLuckyStats()}
					size="small"
					iconPosition="after"
					className={classes.resetButton}
					appearance="primary"
				>
					Refresh Data
				</Button>
			</div>
		</div>
	);
};

export default PlayerForm;
