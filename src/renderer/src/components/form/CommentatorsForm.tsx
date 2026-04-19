import { Body1, Caption1, mergeClasses } from '@fluentui/react-components';
import Panel from '../panel/Panel';
import TextField from './inputs/TextField';
import formStyles from './styles/FormStyles';
import { CommentatorData, GameplayData } from '@common/interfaces/Data';
import { useSelector } from 'react-redux';
import { AppState } from '@redux/reducers/rootReducer';
import CheckboxField from './inputs/CheckboxField';
import NumberField from './inputs/NumberField';
import { MAX_COMMENTATOR_LENGTH, MAX_MESSAGE_LENGTH, MAX_TIMER } from '@common/constants/limits';
import CommentatorSelectField from './inputs/CommentatorSelectField';
import useOverlayControls from '@hooks/controls/useOverlayControls';
import useLocalCommentators from '@renderer/hooks/data/useLocalCommentators';

const CommentatorsForm = () => {
	const classes = formStyles();

	const gameplayData: GameplayData = useSelector((state: AppState) => state.dataState.gameplay);

	const commentatorData: CommentatorData = useSelector(
		(state: AppState) => state.dataState.commentators
	);

	const { handleCommentatorsChange } = useOverlayControls();

	const { commentatorList } = useLocalCommentators();

	const localDataExists = commentatorList.length > 0;

	return (
		<Panel>
			<div className={mergeClasses(classes.formSection, classes.borderBottom)}>
				<Body1 className={classes.sectionTitle}>Commentators</Body1>
				<div className={classes.formRow}>
					<CheckboxField
						label="Show Labels"
						checked={commentatorData.showCommentators}
						targetField={'showCommentators'}
						handleChange={handleCommentatorsChange}
					/>
					{localDataExists ? (
						<CommentatorSelectField
							commentatorList={commentatorList}
							label="Commentator Left"
							value={commentatorData.commentator1}
							commentatorNumber="1"
							placeholder="Commentator 1"
							maxLength={MAX_COMMENTATOR_LENGTH}
						/>
					) : (
						<TextField
							label="Commentator Left"
							value={commentatorData.commentator1}
							targetField={'commentator1'}
							handleChange={handleCommentatorsChange}
							placeholder="Commentator 1"
							maxLength={MAX_COMMENTATOR_LENGTH}
						/>
					)}
					{localDataExists ? (
						<CommentatorSelectField
							commentatorList={commentatorList}
							label="Commentator Middle"
							value={commentatorData.commentator2}
							commentatorNumber="2"
							placeholder="Commentator 2"
							maxLength={MAX_COMMENTATOR_LENGTH}
						/>
					) : (
						<TextField
							label="Commentator Middle"
							value={commentatorData.commentator2}
							targetField={'commentator2'}
							handleChange={handleCommentatorsChange}
							placeholder="Commentator 2"
							maxLength={MAX_COMMENTATOR_LENGTH}
						/>
					)}
					{localDataExists ? (
						<CommentatorSelectField
							commentatorList={commentatorList}
							label="Commentator Right"
							value={commentatorData.commentator3}
							commentatorNumber="3"
							placeholder="Commentator 3"
							maxLength={MAX_COMMENTATOR_LENGTH}
						/>
					) : (
						<TextField
							label="Commentator Right"
							value={commentatorData.commentator3}
							targetField={'commentator3'}
							handleChange={handleCommentatorsChange}
							placeholder="Commentator 3"
							maxLength={MAX_COMMENTATOR_LENGTH}
						/>
					)}
				</div>
				<div className={classes.formRow}>
					<CheckboxField
						label="Show Labels"
						checked={commentatorData.showCommentators}
						targetField={'showCommentators'}
						handleChange={handleCommentatorsChange}
						style={{ opacity: 0 }}
					/>
					<TextField
						label="Left Social"
						value={commentatorData.social1}
						targetField={'social1'}
						handleChange={handleCommentatorsChange}
						placeholder="@socialhandle"
						maxLength={MAX_COMMENTATOR_LENGTH}
					/>
					<TextField
						label="Middle Social"
						value={commentatorData.social2}
						targetField={'social2'}
						handleChange={handleCommentatorsChange}
						placeholder="@socialhandle"
						maxLength={MAX_COMMENTATOR_LENGTH}
					/>
					<TextField
						label="Right Social"
						value={commentatorData.social3}
						targetField={'social3'}
						handleChange={handleCommentatorsChange}
						placeholder="@socialhandle"
						maxLength={MAX_COMMENTATOR_LENGTH}
					/>
				</div>
			</div>
			<div className={classes.formSection}>
				<Body1 className={classes.sectionTitle}>Event Information</Body1>
				<div className={classes.formRow}>
					<CheckboxField
						label="Show Event Info"
						checked={commentatorData.showEvent}
						targetField={'showEvent'}
						handleChange={handleCommentatorsChange}
						disabled={true}
					/>
					<TextField
						label="Title"
						value={commentatorData.eventName}
						targetField={'eventName'}
						handleChange={handleCommentatorsChange}
						placeholder="Melee Singles"
						maxLength={MAX_MESSAGE_LENGTH}
					/>
					{/* <SelectField
						label="Event Time"
						value={commentatorData.eventTime}
						targetField={'eventTime'}
						handleChange={handleCommentatorsChange}
						options={['Next', 'Now']}
					/> */}
					{/* <SelectField
						label="Event Name"
						value={commentatorData.eventName}
						targetField={'eventName'}
						handleChange={handleCommentatorsChange}
						options={[
							'Opening',
							'Intermission',
							'Melee Singles',
							'Grand Finals',
							'Swiss Pools',
							'Final Bracket',
							'Melee Doubles',
							'VIP Bracket',
							'Crew Battle',
							'Money Match',
							'Grudge Match',
							'Side Event',
							'Friendlies'
						]}
					/> */}
					{/* <NumberField
						label="Day Number"
						value={commentatorData.day}
						targetField={'day'}
						handleChange={handleCommentatorsChange}
						defaultValue={1}
						min={0}
						max={MAX_DAY}
					/> */}
				</div>
				<div className={classes.formRow}>
					<CheckboxField
						label="Show Message"
						checked={commentatorData.showMessage}
						targetField={'showMessage'}
						handleChange={(targetField, value) => {
							handleCommentatorsChange('showMatch', false);
							handleCommentatorsChange(targetField, value);
						}}
					/>
					<TextField
						label="Message"
						value={commentatorData.message}
						targetField={'message'}
						handleChange={handleCommentatorsChange}
						placeholder="Welcome!"
						maxLength={MAX_MESSAGE_LENGTH}
					/>
				</div>
				<div className={classes.formRow}>
					<CheckboxField
						label="Show Timer"
						checked={commentatorData.showTimer}
						targetField={'showTimer'}
						handleChange={handleCommentatorsChange}
					/>
					<NumberField
						label="Timer Minutes"
						value={commentatorData.timerMinutes}
						targetField={'timerMinutes'}
						handleChange={handleCommentatorsChange}
						min={1}
						max={MAX_TIMER}
					/>
				</div>
				{/* <div className={classes.formRow}>
					<CheckboxField
						label="Show Ads"
						checked={commentatorData.showAds}
						targetField={'showAds'}
						handleChange={handleCommentatorsChange}
					/>
				</div> */}
				<div className={classes.formRow}>
					<CheckboxField
						label="Show Match"
						checked={commentatorData.showMatch}
						targetField={'showMatch'}
						handleChange={(targetField, value) => {
							handleCommentatorsChange('showMessage', false);
							handleCommentatorsChange(targetField, value);
						}}
					/>
					<div className={classes.subText}>
						<Caption1>
							Currently: {gameplayData.player1.tag} vs {gameplayData.player2.tag}
						</Caption1>
					</div>
				</div>
			</div>
		</Panel>
	);
};

export default CommentatorsForm;
