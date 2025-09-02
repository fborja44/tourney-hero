import { Body1, mergeClasses } from '@fluentui/react-components';
import Panel from '../panel/Panel';
import TextField from './inputs/TextField';
import formStyles from './styles/FormStyles';
import NumberField from './inputs/NumberField';
import CheckboxField from './inputs/CheckboxField';
import { BracketData } from '@common/interfaces/Data';
import { MAX_SCORE, MAX_TAG_LENGTH } from '@common/constants/limits';
import useOverlayControls from '@hooks/controls/useOverlayControls';
import { useSelector } from 'react-redux';
import { AppState } from '@renderer/redux/reducers/rootReducer';

interface BracketFormSectionProps {
	title: string;
	bracketField: keyof BracketData;
	className?: string;
}

const BracketFormSection = ({ title, bracketField, className }: BracketFormSectionProps) => {
	const classes = formStyles();

	const bracketData: BracketData = useSelector((state: AppState) => state.dataState.bracket);

	const { createBracketFieldChangeHandler } = useOverlayControls();

	/**
	 * On change handler. Updates the the target field in bracket match redux state.
	 * @param targetField
	 * @param value
	 */
	const handleMatchChange = createBracketFieldChangeHandler(bracketField);

	return (
		<div className={mergeClasses(classes.formSection, className)}>
			<Body1 className={classes.sectionTitle}>{title}</Body1>
			<div className={classes.formRow}>
				<CheckboxField
					label="Completed"
					checked={bracketData[bracketField].completed}
					targetField={'completed'}
					handleChange={handleMatchChange}
					style={{ flexGrow: 1 }}
				/>
				<TextField
					label="Player 1 Tag"
					value={bracketData[bracketField].p1tag}
					targetField={'p1tag'}
					handleChange={handleMatchChange}
					placeholder="Player 1 Tag"
					maxLength={MAX_TAG_LENGTH}
				/>
				<NumberField
					label="Score"
					value={bracketData[bracketField].p1score}
					targetField="p1score"
					handleChange={handleMatchChange}
					min={-1}
					max={MAX_SCORE}
				/>
			</div>
			<div className={classes.formRow}>
				<CheckboxField
					label="Started"
					checked={bracketData[bracketField].started}
					targetField={'started'}
					handleChange={handleMatchChange}
					style={{ flexGrow: 1 }}
				/>
				<TextField
					label="Player 2 Tag"
					value={bracketData[bracketField].p2tag}
					targetField={'p2tag'}
					handleChange={handleMatchChange}
					placeholder="Player 2 Tag"
					maxLength={MAX_TAG_LENGTH}
				/>
				<NumberField
					label="Score"
					value={bracketData[bracketField].p2score}
					targetField="p2score"
					handleChange={handleMatchChange}
					min={-1}
					max={MAX_SCORE}
				/>
			</div>
		</div>
	);
};

const BracketForm = () => {
	const classes = formStyles();

	return (
		<Panel>
			<div className={classes.formSectionRow}>
				<BracketFormSection
					title={'Losers Round 1 (Top)'}
					bracketField="lr1Top"
					className={classes.formSectionLeft}
				/>
				<BracketFormSection title={'Losers Round 1 (Bottom)'} bracketField="lr1Bottom" />
			</div>
			<div className={classes.formSectionRow}>
				<BracketFormSection
					title={'Winners Semifinal (Top)'}
					bracketField="wsfTop"
					className={classes.formSectionLeft}
				/>
				<BracketFormSection title={'Winners Semifinal (Bottom)'} bracketField="wsfBottom" />
			</div>
			<div className={classes.formSectionRow}>
				<BracketFormSection
					title={'Losers Quarterfinal (Top)'}
					bracketField="lqfTop"
					className={classes.formSectionLeft}
				/>
				<BracketFormSection
					title={'Losers Quarterfinal (Bottom)'}
					bracketField="lqfBottom"
				/>
			</div>
			<div className={classes.formSectionRow}>
				<BracketFormSection
					title={'Winners Final'}
					bracketField="wf"
					className={classes.formSectionLeft}
				/>
				<BracketFormSection title={'Losers Semifinal'} bracketField="lsf" />
			</div>
			<div className={classes.formSectionRow}>
				<BracketFormSection
					title={'Losers Final'}
					bracketField="lf"
					className={classes.formSectionLeft}
				/>
				<BracketFormSection title={'Grand Final'} bracketField="gf" />
			</div>
			<BracketFormSection title={'Grand Final Reset'} bracketField="gfReset" />
		</Panel>
	);
};

export default BracketForm;
