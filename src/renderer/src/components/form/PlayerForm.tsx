import { Body1, OptionOnSelectData, mergeClasses } from '@fluentui/react-components';
import TextField from './inputs/TextField';
import formStyles from './styles/FormStyles';
import RadioGroupField from './inputs/RadioGroupField';
import { DataField, HeadData, PlayerData } from '@common/interfaces/Data';
import NumberField from './inputs/NumberField';
import { useDispatch, useSelector } from 'react-redux';
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
import { useEffect, useState } from 'react';
import CountryField from './inputs/CountryField';
import { PlayerUpdateFunction } from './PlayerFormSection';
import CrewBattleField from './inputs/CrewBattleField';

interface PlayerFormProps {
	playerNumber: '1' | '2';
	playerData: PlayerData;
	updateFn: PlayerUpdateFunction;
}

const PlayerForm = ({ playerNumber, playerData, updateFn }: PlayerFormProps) => {
	const classes = formStyles();
	const playerClasses = playerFormStyles();
	const dispatch = useDispatch();

	const { entrantList } = useSelector((state: AppState) => state.tournamentState.entrants);

	/**
	 * On change handler. Updates the the target field in gameplay redux state.
	 * @param targetField
	 * @param value
	 */
	const handlePlayerChange = (
		targetField: DataField,
		value: string | number | HeadData[] | boolean | null
	) => {
		dispatch(
			updateFn(`player${playerNumber}`, {
				[targetField]: value
			})
		);
	};

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

	// TODO: put in hook
	const [playersList, setPlayersList] = useState<PlayerData[]>([]);

	const getPlayersList = async () => {
		const result = await window.api.getPlayers();
		setPlayersList(result);
		return result;
	};

	useEffect(() => {
		getPlayersList();
	}, []);

	const handleEntrantSelect = (_ev, data) => {
		const player = entrantList.find((entrant) => entrant.id.toString() === data.optionValue);
		const localPlayer = playersList.find((player) => player.tag === data.optionText);

		const playerData: Partial<PlayerData> = {
			tag: localPlayer?.tag ?? player?.tag ?? '',
			team: localPlayer?.team ?? player?.team ?? '',
			pronoun: localPlayer?.pronoun ?? player?.pronoun ?? '',
			characterId: localPlayer?.characterId ?? player?.characterId ?? null
		};
		dispatch(updateFn(`player${playerNumber}`, playerData));
	};

	const handleTagChange = (event) => {
		handlePlayerChange('tag', event.target.value);
	};

	const handleCountrySelect = (_ev, data: OptionOnSelectData) => {
		handlePlayerChange('countryCode', data.optionValue ?? '??');
	};

	return (
		<div
			className={mergeClasses(
				classes.formSection,
				playerNumber === '1' ? playerClasses.p1Section : playerClasses.p2Section,
				getPortColor(playerData.port)
			)}
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
					handleChange={handlePlayerChange}
					min={1}
					max={MAX_SEED}
				/>
				<span className={classes.gap} />
				<NumberField
					label="Score"
					value={playerData.score}
					targetField="score"
					handleChange={handlePlayerChange}
					min={MIN_SCORE}
					max={MAX_SCORE}
				/>
			</div>
			<div className={classes.formRow}>
				<CharacterField
					label="Character"
					value={playerData.characterId?.toString()}
					targetField="characterId"
					handleChange={handlePlayerChange}
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
					items={['Red', 'Blue', 'Yellow', 'Green', 'None']} // or 'None'
					playerNumber={playerNumber}
				/>
			</div>
			<div className={classes.formRow}>
				<CrewBattleField
					label="Crew Battle / Stocks"
					targetField="heads"
					handleChange={handlePlayerChange}
					playerNumber={playerNumber}
				/>
			</div>
		</div>
	);
};

export default PlayerForm;
