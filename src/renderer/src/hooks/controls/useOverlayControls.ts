import { BracketData, DataField, HeadData, OverlayData, PlayerData } from '@common/interfaces/Data';
import {
	updateBracketMatch,
	updateOverlayField,
	updatePlayer
} from '@renderer/redux/actions/dataActions';
import { useDispatch } from 'react-redux';

const useOverlayControls = () => {
	const dispatch = useDispatch();

	/**
	 * On change handler generator. Updates the target field in overlay redux state.
	 * @param overlay - The overlay data field to update
	 * @returns A change handler function.
	 */
	const createFieldChangeHandler = (overlay: keyof OverlayData) => {
		return (targetField: DataField, value: Partial<DataField[keyof DataField]> | null) => {
			dispatch(
				updateOverlayField(overlay, {
					[targetField]: value
				})
			);
		};
	};

	/**
	 * On change handler generator. Updates the target field in bracket redux state.
	 * @param bracketField - The bracket data field to update.
	 * @returns A change handler function.
	 */
	const createBracketFieldChangeHandler = (bracketField: keyof BracketData) => {
		return (targetField: DataField, value: string | number | boolean) => {
			dispatch(
				updateBracketMatch(bracketField, {
					[targetField]: value
				})
			);
		};
	};

	/**
	 * On change handler. Updates the target field in player card redux state.
	 * @param targetField The gameplay field to update
	 * @param value The value to update to
	 */
	const handleGameplayChange = createFieldChangeHandler('gameplay');

	/**
	 * On change handler generator. Updates the target player field in gameplay redux state.
	 * @param playerNumber The player number (1 or 2)
	 * @returns A change handler function.
	 */
	const createPlayerFormChangeHandler = (playerNumber: '1' | '2') => {
		return (targetField: DataField, value: string | number | HeadData[] | boolean | null) => {
			dispatch(
				updatePlayer(`player${playerNumber}`, {
					[targetField]: value
				})
			);
		};
	};

	/**
	 * On change handler. Updates the target field in commentators card redux state.
	 * @param targetField The commentator field to update
	 * @param value The value to update to
	 */
	const handlePlayerFieldChange = (
		targetPlayer: 'player1' | 'player2',
		targetField: DataField,
		value: string | number | HeadData[] | boolean | null
	) => {
		dispatch(
			updatePlayer(targetPlayer, {
				[targetField]: value
			})
		);
	};

	/**
	 * On change handler. Updates the  field in commentators card redux state.
	 * @param targetField The commentator field to update
	 * @param value The value to update to
	 */
	const handlePlayerChange = (
		targetPlayer: 'player1' | 'player2',
		updatedPlayer: Partial<PlayerData>
	) => {
		dispatch(updatePlayer(targetPlayer, updatedPlayer));
	};

	/**
	 * On change handler. Updates the target field in commentators card redux state.
	 * @param targetField The commentator field to update
	 * @param value The value to update to
	 */
	const handleCommentatorsChange = createFieldChangeHandler('commentators');

	/**
	 * On change handler. Updates the target field in player card redux state.
	 * @param targetField The player card field to update
	 * @param value The value to update to
	 */
	const handlePlayerCardChange = createFieldChangeHandler('playerCard');

	/**
	 * On change handler. Updates the target field in crew battle redux state.
	 * @param targetField The crew battle field to update
	 * @param value The value to update to
	 */
	const handleCrewBattleChange = createFieldChangeHandler('crewBattle');

	return {
		createFieldChangeHandler,
		handleGameplayChange,
		createBracketFieldChangeHandler,
		handleCommentatorsChange,
		handlePlayerCardChange,
		handleCrewBattleChange,
		createPlayerFormChangeHandler,
		handlePlayerFieldChange,
		handlePlayerChange
	};
};

export default useOverlayControls;
