import { BracketData, DataField } from '@common/interfaces/Data';
import { updateBracketMatch } from '@renderer/redux/actions/dataActions';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';

const useBracketControls = (bracketField: keyof BracketData) => {
	const dispatch = useDispatch();
	const bracketData = useSelector((state: AppState) => state.dataState.bracket);

	/**
	 * On change handler. Updates the the target field in bracket redux state.
	 * @param targetField
	 * @param value
	 */
	const handleMatchChange = (targetField: DataField, value: string | number | boolean) => {
		dispatch(
			updateBracketMatch(bracketField, {
				[targetField]: value
			})
		);
	};

	return { bracketData, handleMatchChange };
};

export default useBracketControls;
