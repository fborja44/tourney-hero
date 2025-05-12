import { Body1, mergeClasses } from '@fluentui/react-components';
import Panel from '../panel/Panel';
import TextField from './inputs/TextField';
import formStyles from './styles/FormStyles';
import { CrewBattleData } from '@common/interfaces/Data';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@redux/reducers/rootReducer';
import { updateCrewBattle } from '@redux/actions/dataActions';
import { MAX_TAG_LENGTH } from '@common/constants/limits';

const CrewBattleForm = () => {
	const classes = formStyles();

	const dispatch = useDispatch();

	const crewData: CrewBattleData = useSelector((state: AppState) => state.dataState.crewBattle);

	/**
	 * On change handler. Updates the the target field in crew battle redux state.
	 * @param targetField
	 * @param value
	 */
	const handleCrewBattleChange = (targetField: string, value: string | number | boolean) => {
		dispatch(
			updateCrewBattle({
				[targetField]: value
			})
		);
	};

	return (
		<Panel>
			<div className={mergeClasses(classes.formSectionRow, classes.relative)}>
				<div className={mergeClasses(classes.formSection, classes.borderBottom)}>
					<Body1 className={classes.sectionTitle}>Crew 1</Body1>
					<div className={classes.formRow}></div>
					<TextField
						label="Name"
						value={crewData.team1Name}
						targetField={'team1Name'}
						handleChange={handleCrewBattleChange}
						placeholder="Crew 1"
						maxLength={MAX_TAG_LENGTH}
					/>
				</div>
				<div className={mergeClasses(classes.formSection, classes.borderBottom)}>
					<Body1 className={classes.sectionTitle}>Crew 2</Body1>
					<div className={classes.formRow}></div>
					<TextField
						label="Name"
						value={crewData.team2Name}
						targetField={'team2Name'}
						handleChange={handleCrewBattleChange}
						placeholder="Crew 2"
						maxLength={MAX_TAG_LENGTH}
					/>
				</div>
			</div>
		</Panel>
	);
};

export default CrewBattleForm;
