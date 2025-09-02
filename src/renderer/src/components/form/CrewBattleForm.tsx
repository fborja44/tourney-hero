import { Body1, Button, mergeClasses } from '@fluentui/react-components';
import Panel from '../panel/Panel';
import TextField from './inputs/TextField';
import formStyles from './styles/FormStyles';
import { CrewBattleData } from '@common/interfaces/Data';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@redux/reducers/rootReducer';
import { updateCrewBattle } from '@redux/actions/dataActions';
import { MAX_TAG_LENGTH } from '@common/constants/limits';
import { Add16Filled } from '@fluentui/react-icons';
import CrewItemField from './inputs/CrewItemField';
import CheckboxField from './inputs/CheckboxField';
import useOverlayControls from '@hooks/controls/useOverlayControls';

const CrewBattleForm = () => {
	const classes = formStyles();

	const crewData: CrewBattleData = useSelector((state: AppState) => state.dataState.crewBattle);

	const { handleCrewBattleChange } = useOverlayControls();

	return (
		<Panel>
			<div className={mergeClasses(classes.formSection, classes.borderBottom)}>
				<Body1 className={classes.sectionTitle}>General Info</Body1>
				<div className={classes.formRow}>
					<CheckboxField
						label="Show Crews"
						checked={crewData.showTeams}
						targetField={'showTeams'}
						handleChange={handleCrewBattleChange}
					/>
				</div>
			</div>
			<div className={mergeClasses(classes.formSectionRow, classes.relative)}>
				<div
					className={mergeClasses(
						classes.formSection,
						classes.borderBottom,
						classes.firstSection
					)}
				>
					<Body1 className={classes.sectionTitle}>Crew 1</Body1>
					<div className={classes.formRow}>
						<TextField
							label="Name"
							value={crewData.team1Name}
							targetField={'team1Name'}
							handleChange={handleCrewBattleChange}
							placeholder="Crew 1"
							maxLength={MAX_TAG_LENGTH}
						/>
					</div>
					<TeamPlayersForm team="team1Players" />
				</div>
				<div className={mergeClasses(classes.formSection, classes.borderBottom)}>
					<Body1 className={classes.sectionTitle}>Crew 2</Body1>
					<div className={classes.formRow}>
						<TextField
							label="Name"
							value={crewData.team2Name}
							targetField={'team2Name'}
							handleChange={handleCrewBattleChange}
							placeholder="Crew 2"
							maxLength={MAX_TAG_LENGTH}
						/>
					</div>
					<TeamPlayersForm team="team2Players" />
				</div>
			</div>
		</Panel>
	);
};

export default CrewBattleForm;

interface TeamPlayersFormProps {
	team: 'team1Players' | 'team2Players';
}

const TeamPlayersForm = ({ team }: TeamPlayersFormProps) => {
	const classes = formStyles();

	const dispatch = useDispatch();

	const crewData: CrewBattleData = useSelector((state: AppState) => state.dataState.crewBattle);

	const addCrewPlayer = () => {
		dispatch(
			updateCrewBattle({
				[team]: [...crewData[team], { tag: '', active: true }]
			})
		);
	};

	return (
		<>
			<div className={classes.formRow}>
				<Button
					size="small"
					icon={<Add16Filled />}
					iconPosition="after"
					className={classes.addButton}
					onClick={() => addCrewPlayer()}
					appearance="primary"
				>
					Add Team Player
				</Button>
			</div>
			{crewData[team].length > 0 && (
				<div className={classes.itemList}>
					{crewData[team].map((_player, index) => {
						return <CrewItemField key={`${team}-${index}`} team={team} index={index} />;
					})}
				</div>
			)}
		</>
	);
};
