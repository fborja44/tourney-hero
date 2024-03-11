import {
	Button,
	Caption1,
	DialogActions,
	DialogBody,
	DialogContent,
	DialogSurface,
	DialogTitle,
	DialogTrigger,
	Subtitle2,
	makeStyles,
	shorthands,
	tokens
} from '@fluentui/react-components';
import { Entrant, Match, MutationGameData } from '@common/interfaces/Types';
import Card from '../../card/Card';
import { Send16Regular } from '@fluentui/react-icons';
import { useState } from 'react';
import { getTargetWins } from '../../../utils/tournament';
import useQuery from '../../../hooks/useStartQuery';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducers/rootReducer';
import reportSetDataMutation from '../../../graphql/mutations/reportSetMutation';
import { updateMatch } from '../../../redux/actions/tournamentActions';
import { getCurrentUnixTimestamp } from '../../../utils/date';
import { MatchCardHeader } from '../../dashboard/match/MatchCard';

const useStyles = makeStyles({
	dialogSurface: {
		width: 'fit-content',
		...shorthands.padding(
			tokens.spacingVerticalM,
			tokens.spacingVerticalXXXL,
			tokens.spacingVerticalM,
			tokens.spacingVerticalXXXL
		)
	},
	dialogTitle: {
		textAlign: 'center'
	},
	dialogContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		...shorthands.margin(0),
		...shorthands.padding(tokens.spacingVerticalS, 0, tokens.spacingVerticalXL, 0)
	},
	dialogActions: {
		display: 'flex',
		justifyContent: 'flex-end',
		paddingBottom: tokens.spacingVerticalS
	},
	playerContent: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: tokens.spacingVerticalM,
		...shorthands.gap(tokens.spacingVerticalS)
	},
	matchInfo: {
		color: tokens.colorNeutralForeground2
	},
	playerContainer: {
		height: '25px',
		paddingLeft: tokens.spacingHorizontalS,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: tokens.colorNeutralBackground1,
		...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
		...shorthands.borderRadius(tokens.borderRadiusMedium)
	},
	playerScoreInput: {
		fontFamily: tokens.fontFamilyBase,
		display: 'flex',
		backgroundColor: 'inherit',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		color: tokens.colorNeutralForeground1,
		...shorthands.borderRadius(0, '5px', '5px', 0),
		...shorthands.border('0px'),
		...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralStroke2),
		height: '100%',
		width: '50px',
		fontSize: '13px',
		'&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
			opacity: 1
		}
	},
	errorText: {
		color: tokens.colorPaletteRedForeground1,
		marginTop: tokens.spacingVerticalM,
		width: 'fit-content'
	},
	warning: {
		color: tokens.colorStatusWarningForeground1,
		justifyContent: 'center',
		alignItems: 'center',
		'& span': {
			textAlign: 'center',
			display: 'block'
		}
	}
});

interface PlayerContainerProps {
	player: Entrant;
	score: number;
	setScore: React.Dispatch<React.SetStateAction<number>>;
	max?: number;
}

const PlayerContainer = ({ player, score, setScore, max }: PlayerContainerProps) => {
	const classes = useStyles();
	return (
		<div className={classes.playerContainer}>
			<Caption1>{player.tag}</Caption1>
			<input
				type="number"
				className={classes.playerScoreInput}
				value={score}
				min={-1}
				max={max ?? 4}
				onChange={(ev) => setScore(parseInt(ev.target.value))}
			/>
		</div>
	);
};

interface MatchReportingDialog {
	match: Match;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MatchReportingDialog = ({ match, setOpen }: MatchReportingDialog) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { player1, player2, bracket } = match;
	const { bestOf } = bracket;

	const { key, tournamentSlug, eventSlug, validated } = useSelector(
		(state: AppState) => state.tournamentState
	);

	const [score1, setScore1] = useState(player1.score ?? 0);
	const [score2, setScore2] = useState(player2.score ?? 0);

	const { error, setError, loading, sendMutation } = useQuery();

	const target = getTargetWins(bestOf ?? undefined);

	/**
	 * Sends a set report query.
	 * @returns True if successful. False otherwise.
	 */
	const reportGameData = async () => {
		setError(null);
		if (!key || !tournamentSlug || !eventSlug || !validated) {
			setError('start.gg credentials not validated');
			return false;
		}

		const isDQ = score1 === -1 || score2 === -1;

		if (score1 !== -1 && score2 !== -1 && score1 === score2) {
			setError('Cannot report a tie.');
			return false;
		}

		if (!isDQ && Math.max(score1, score2) !== target) {
			setError(`Not enough games for a Best of ${bestOf}.`);
			return false;
		}

		console.log('Reporting set...');

		const winnerId = score1 > score2 ? player1.id : player2.id;
		const loserId = score1 < score2 ? player1.id : player2.id;

		// TODO: Report game data

		// TODO: success vs error
		const result = await sendMutation(
			key,
			reportSetDataMutation(
				match.id,
				winnerId,
				generateGameData(
					winnerId,
					Math.max(score1, score2),
					loserId,
					Math.min(score1, score2)
				),
				isDQ
			)
		);
		console.log(result);
		if (result && result.data) {
			// Update matches and close dialog
			dispatch(
				updateMatch(match.id, {
					winnerId: winnerId,
					completedAt: getCurrentUnixTimestamp(),
					state: 3,
					player1: {
						...player1,
						score: !isDQ ? score1 : player1.id === winnerId ? 0 : -1
					},
					player2: {
						...player2,
						score: !isDQ ? score2 : player2.id === winnerId ? 0 : -1
					}
				})
			);
			setOpen(false);
			return true;
		}
		setError('Failed to submit score');
		return false;
	};

	/**
	 * Generates game data list for submission.
	 * Losers games are set first. Winners games are set last.
	 * @param winnerId The winner player id
	 * @param winnerScore The winner score
	 * @param loserId The loser player id
	 * @param loserScore The loser score
	 * @returns A list of game data.
	 */
	const generateGameData = (
		winnerId: number,
		winnerScore: number,
		loserId: number,
		loserScore: number
	): MutationGameData[] => {
		if (winnerScore < 0 || loserScore < 0) {
			return [];
		}

		const gameList: MutationGameData[] = [];
		for (let i = 0; i < loserScore; i++) {
			gameList.push({
				winnerId: loserId,
				gameNum: i
			});
		}
		for (let i = 0; i < winnerScore; i++) {
			gameList.push({
				winnerId: winnerId,
				gameNum: i + loserScore
			});
		}
		return gameList;
	};

	return (
		<DialogSurface className={classes.dialogSurface}>
			<DialogBody>
				<DialogTitle className={classes.dialogTitle}>
					<Subtitle2>Report Match Score</Subtitle2>
				</DialogTitle>
			</DialogBody>
			<DialogContent className={classes.warning}>
				<Caption1>EXPERIMENTAL FEATURE:</Caption1>
				<Caption1>start.gg will report games out of order</Caption1>
			</DialogContent>
			<DialogContent className={classes.dialogContent}>
				<Card>
					<MatchCardHeader match={match} />
					<div className={classes.playerContent}>
						<PlayerContainer
							player={player1}
							setScore={setScore1}
							score={score1}
							max={target}
						/>
						<PlayerContainer
							player={player2}
							setScore={setScore2}
							score={score2}
							max={target}
						/>
					</div>
				</Card>
				{error && <Caption1 className={classes.errorText}>{error}</Caption1>}
			</DialogContent>
			<DialogActions className={classes.dialogActions}>
				<DialogTrigger disableButtonEnhancement>
					<Button size="small" onClick={() => setOpen(false)}>
						Cancel
					</Button>
				</DialogTrigger>
				<Button
					size="small"
					appearance="primary"
					icon={<Send16Regular />}
					iconPosition="after"
					onClick={() => reportGameData()}
					disabled={loading || !validated || !key}
				>
					{loading ? 'Submitting...' : 'Submit Result'}
				</Button>
			</DialogActions>
		</DialogSurface>
	);
};

export default MatchReportingDialog;
