import { Body1 } from '@fluentui/react-components';
import Panel from '../panel/Panel';
import formStyles from './styles/FormStyles';
import CheckboxField from './inputs/CheckboxField';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlayerCard } from '@redux/actions/dataActions';
import { PlayerCardData, PlayerData } from '@common/interfaces/Data';
import { AppState } from '@redux/reducers/rootReducer';
import TextField from './inputs/TextField';
import CharacterField from './inputs/CharacterField';
import { MAX_TAG_LENGTH, MAX_TEAM_LENGTH } from '@common/constants/limits';
import EntrantSelectField from './inputs/EntrantSelectField';
import EmptyPanel from '../panel/EmptyPanel';
import { useEffect, useState } from 'react';
import useEntrant from '@renderer/hooks/useEntrant';

const PlayerCardForm = () => {
	const classes = formStyles();

	const dispatch = useDispatch();

	const playerCardData: PlayerCardData = useSelector(
		(state: AppState) => state.dataState.playerCard
	);

	const { entrantList } = useSelector((state: AppState) => state.tournamentState.entrants);

	const { fetchEntrantData } = useEntrant();

	/**
	 * On change handler. Updates the the target field in gameplay redux state.
	 * @param targetField
	 * @param value
	 */
	const handlePlayerCardChange = (targetField: string, value: string | number | boolean) => {
		dispatch(
			updatePlayerCard({
				[targetField]: value
			})
		);
	};

	if (entrantList.length === 0) {
		return <EmptyPanel text="No Entrants Found" />;
	}

	// TODO: put in hook
	// const [playersList, setPlayersList] = useState<PlayerData[]>([]);

	// const getPlayersList = async () => {
	// 	const result = await window.api.getPlayers();
	// 	console.log(result);
	// 	setPlayersList(result);
	// 	return result;
	// };

	// useEffect(() => {
	// 	getPlayersList();
	// }, []);

	const handleEntrantSelect = async (_ev, data) => {
		const entrantId = data.optionValue;
		const entrantData = await fetchEntrantData(entrantId);
		if (!entrantData) {
			return false;
		}

		dispatch(updatePlayerCard(entrantData));
		return true;
	};

	const { tag, character, twitter, twitch, team } = playerCardData;

	// TODO: Display match results and placements

	return (
		<Panel>
			<div className={`${classes.formSection}`}>
				<Body1 className={classes.sectionTitle}>Player Selection</Body1>
				<div className={classes.formRow}>
					<EntrantSelectField
						label="Entrant Selector / Tag"
						onOptionSelect={handleEntrantSelect}
						onChange={() => {}}
						value={tag}
						placeholder={'Select An Entrant'}
						maxLength={MAX_TAG_LENGTH}
					/>
					<span className={classes.gap} />
					<CharacterField
						label="Character"
						targetField="character"
						handleChange={handlePlayerCardChange}
						value={character}
					/>
				</div>
				<div className={classes.formRow}>
					<TextField
						label="Twitter Handle"
						value={twitter}
						targetField={'twitter'}
						handleChange={handlePlayerCardChange}
						maxLength={MAX_TAG_LENGTH}
					/>
					<span className={classes.gap} />
					<TextField
						label="Twitch Channel"
						value={twitch}
						targetField={'twitch'}
						handleChange={handlePlayerCardChange}
						maxLength={MAX_TAG_LENGTH}
					/>
				</div>
				<div className={classes.formRow}>
					<CheckboxField
						label="Show Team"
						checked={playerCardData.showTeamLogo}
						targetField={'showTeamLogo'}
						handleChange={handlePlayerCardChange}
					/>
					<span className={classes.gap} />
					<TextField
						label="Team"
						value={team}
						targetField={'team'}
						handleChange={handlePlayerCardChange}
						maxLength={MAX_TEAM_LENGTH}
					/>
				</div>
			</div>
		</Panel>
	);
};

export default PlayerCardForm;
