import { MAX_TAG_LENGTH } from '@common/constants/limits';
import {
	Button,
	Checkbox,
	Field,
	Input,
	makeStyles,
	shorthands,
	tokens
} from '@fluentui/react-components';
import { Delete16Regular } from '@fluentui/react-icons';
import {
	toggleCrewPlayerActive,
	updateCrewBattle,
	updateCrewPlayerTag
} from '@renderer/redux/actions/dataActions';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';

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

interface CrewItemFieldProps {
	team: 'team1Players' | 'team2Players';
	index: number;
}

const CrewItemField = ({ team, index }: CrewItemFieldProps) => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const crewData = useSelector((state: AppState) => state.dataState.crewBattle);

	const removeCrewPlayer = (index: number) => {
		dispatch(
			updateCrewBattle({
				[team]: crewData[team].filter((_, i) => i !== index)
			})
		);
	};

	if (!crewData[team][index]) {
		return null;
	}

	return (
		<div className={classes.crewItem}>
			<Checkbox
				checked={crewData[team][index].active}
				onClick={() => dispatch(toggleCrewPlayerActive(team, index))}
			/>
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
			<Button
				icon={<Delete16Regular />}
				appearance="outline"
				size="small"
				onClick={() => removeCrewPlayer(index)}
			/>
		</div>
	);
};

export default CrewItemField;
