import { MAX_TAG_LENGTH } from '@common/constants/limits';
import { Checkbox, Field, Input, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { toggleCrewPlayerActive, updateCrewPlayerTag } from '@renderer/redux/actions/dataActions';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';

interface CrewItemFieldProps {
	team: 'team1Players' | 'team2Players';
	index: number;
}

const useStyles = makeStyles({
	formField: {
		flexGrow: 1,
		'& label': {
			color: tokens.colorNeutralForeground3
		}
	},
	input: {
		minWidth: '80px',
		backgroundColor: tokens.colorNeutralBackground1,
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1),
		...shorthands.flex(1)
	},
	crewItem: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'end',
		...shorthands.gap(tokens.spacingHorizontalS)
	}
});

const CrewItemField = ({ team, index }: CrewItemFieldProps) => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const crewData = useSelector((state: AppState) => state.dataState.crewBattle);

	if (!crewData[team][index]) {
		return null;
	}
	return (
		<div className={classes.crewItem}>
			<Field label={`Player ${index + 1}`} className={classes.formField} size="small">
				<Input
					size="small"
					value={crewData[team][index].tag}
					onChange={(_ev, data) => dispatch(updateCrewPlayerTag(team, index, data.value))}
					placeholder="Player Tag"
					maxLength={MAX_TAG_LENGTH}
					className={classes.input}
				/>
			</Field>
			<Checkbox
				checked={crewData[team][index].active}
				onClick={() => dispatch(toggleCrewPlayerActive(team, index))}
			/>
		</div>
	);
};

export default CrewItemField;
