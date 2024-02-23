import { Body1 } from '@fluentui/react-components';
import Panel from '../panel/Panel';
import formStyles from './styles/FormStyles';
import CheckboxField from './inputs/CheckboxField';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlayerCard } from '../../redux/actions/dataActions';
import { PlayerCardData } from '@common/interfaces/Data';
import { AppState } from '../../redux/reducers/rootReducer';
import SelectField from './inputs/SelectField';

const PlayerCardForm = () => {
	const classes = formStyles();

	const dispatch = useDispatch();

	const playerCardData: PlayerCardData = useSelector(
		(state: AppState) => state.dataState.playerCard
	);

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

	return (
		<Panel>
			<div className={`${classes.formSection}`}>
				<Body1 className={classes.sectionTitle}>Player Selection</Body1>
				<div className={classes.formRow}>
					<CheckboxField
						label="Show Photo"
						checked={playerCardData.showPhoto}
						targetField={'showPhoto'}
						handleChange={handlePlayerCardChange}
					/>
					<span className={classes.gap} />
					<SelectField
						label="Player Tag"
						value={playerCardData.playerTag}
						targetField={'playerTag'}
						handleChange={handlePlayerCardChange}
						options={['Player 1', 'Player 2']}
					/>
				</div>
			</div>
		</Panel>
	);
};

export default PlayerCardForm;
