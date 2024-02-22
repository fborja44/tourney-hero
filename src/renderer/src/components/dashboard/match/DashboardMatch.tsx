import {
	Body1Strong,
	Button,
	Caption1,
	Caption1Strong,
	Caption2,
	Caption2Strong,
	Dialog,
	Menu,
	MenuItem,
	MenuList,
	MenuPopover,
	MenuTrigger,
	SplitButton,
	makeStyles,
	mergeClasses,
	shorthands,
	tokens
} from '@fluentui/react-components';
import { Match, Entrant } from '../../../interfaces/Types';
import { convertUnixTimestamp, getCurrentUnixTimestamp } from '../../../utils/date';
import { useDispatch, useSelector } from 'react-redux';
import { updateGameplay, updatePlayer } from '../../../redux/actions/dataActions';
import Card from '@renderer/components/card/Card';
import cardStyles from '../../card/styles/CardStyles';
import {
	TargetEdit16Regular,
	MegaphoneLoud16Regular,
	ArrowReset20Regular,
	VideoRegular
} from '@fluentui/react-icons';
import MatchReportingDialog from '@renderer/components/dialogs/report/MatchReportingDialog';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import { AppState } from '../../../redux/reducers/rootReducer';
import markSetInProgressMutation from '../../../graphql/mutations/markSetInProgressMutation';
import { updateMatch } from '../../../redux/actions/tournamentActions';
import type { MenuButtonProps } from '@fluentui/react-components';
import resetSetMutation from '../../../graphql/mutations/resetSetMutation';

const useStyles = makeStyles({
	container: {
		width: '250px'
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		...shorthands.padding(0, tokens.spacingHorizontalM),
		backgroundColor: tokens.colorNeutralBackground4Selected,
		...shorthands.borderRadius(0, 0, tokens.borderRadiusMedium, tokens.borderRadiusMedium),
		...shorthands.border('1px', 'solid', tokens.colorNeutralStroke3)
		// ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke3),
		// ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3),
	},
	playerContent: {
		display: 'flex',
		flexDirection: 'column',
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
	playerScore: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralStroke2),
		height: '100%',
		width: '25px',
		fontSize: '13px'
	},
	checkIn: {
		color: tokens.colorPaletteGreenForeground1
	},
	menuItemContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3),
		'&:hover': {
			backgroundColor: tokens.colorNeutralBackground3Hover,
			cursor: 'pointer'
			// ...shorthands.borderTop('1px', 'solid', tokens.colorBrandStroke1),
			// ...shorthands.borderBottom('1px', 'solid', tokens.colorBrandStroke1)
		}
	},
	menuItemBorder: {
		backgroundColor: tokens.colorPaletteGreenForeground1,
		height: '100%',
		width: '4px'
	},
	menuItemContent: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		...shorthands.padding(0, tokens.spacingHorizontalM),
		paddingBottom: tokens.spacingVerticalM
	},
	dq: {
		position: 'relative',
		bottom: '1px'
	}
});

interface MatchCardHeaderProps {
	match: Match;
}

export const MatchCardHeader = ({ match }: MatchCardHeaderProps) => {
	const cardClasses = cardStyles();
	const classes = useStyles();

	return (
		<div className={cardClasses.textContent}>
			<div className={cardClasses.textContentRow}>
				<Caption2 className={classes.matchInfo}>
					{match.bracket.name}{' '}
					{match.bracket.bestOf !== undefined && (
						<span>- Best of {match.bracket.bestOf}</span>
					)}
				</Caption2>
				<Caption2 className={classes.matchInfo}>Match {match.identifier}</Caption2>
			</div>
			<div className={cardClasses.textContentRow}>
				<Caption1>
					{/* TODO: Pool If Applicable */}
					{match.roundName}
				</Caption1>
				{match.stream && (
					<Caption2 className={cardClasses.textIcon}>
						{match.stream}
						<VideoRegular />
					</Caption2>
				)}
			</div>
		</div>
	);
};

interface PlayerContainerProps {
	player: Entrant;
	match: Match;
}

const PlayerContainer = ({ player, match }: PlayerContainerProps) => {
	const classes = useStyles();

	const isWinner = match.winnerId === player.id;

	return (
		<div className={classes.playerContainer}>
			<Caption1>{player.tag}</Caption1>
			<Body1Strong className={classes.playerScore}>
				{player.score !== undefined ? (
					player.score === -1 ? (
						<Caption1Strong className={classes.dq}>DQ</Caption1Strong>
					) : (
						player.score
					)
				) : !match.completedAt ? (
					0
				) : isWinner ? (
					'W'
				) : (
					'L'
				)}
			</Body1Strong>
		</div>
	);
};

interface DashboardMatchProps {
	match: Match;
}

const DashboardMatch = ({ match }: DashboardMatchProps) => {
	const classes = useStyles();
	const cardClasses = cardStyles();

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const { player1, player2 } = match;

	const waiting = match.state === 1;

	const inProgress = match.state === 2;

	const completed = match.state === 3;

	const status = completed
		? 'Match Completed'
		: inProgress
			? 'Match In Progress...'
			: 'Waiting to Start...';

	const color = completed
		? 'black'
		: inProgress
			? tokens.colorPaletteMarigoldBackground3
			: tokens.colorPaletteGreenForeground1;

	const infoText = completed
		? convertUnixTimestamp(match.completedAt ?? 0)
		: inProgress
			? convertUnixTimestamp(match.startedAt ?? 0)
			: convertUnixTimestamp(match.startAt ?? 0);

	const { key, tournamentSlug, eventSlug, validated } = useSelector(
		(state: AppState) => state.tournamentState
	);

	const { loading, fetchData: sendMutation, setError } = useQuery();

	/**
	 * Makes a set as in progress if it has not yet been started.
	 * @returns True if successful. False otherwise.
	 */
	const markSetInProgress = async () => {
		if (!key || !tournamentSlug || !eventSlug || !validated) {
			setError('Invalid or missing credentials');
			return false;
		}

		if (inProgress || completed) {
			setError('Match already started');
			return false;
		}

		console.log('Calling set...');

		// TODO: success vs error
		const result = await sendMutation(key, markSetInProgressMutation(match.id));
		console.log(result);
		if (result?.data) {
			// Update match
			dispatch(
				updateMatch(match.id, {
					startedAt: getCurrentUnixTimestamp(),
					state: result?.data?.markSetInProgress?.state ?? 2
				})
			);
			return true;
		}
		return false;
	};

	/**
	 * Resets a set to ready state if the match is in progress.
	 * Does not allow completed sets to reset.
	 * @returns True if successful. False otherwise.
	 */
	const resetSet = async () => {
		if (!key || !tournamentSlug || !eventSlug || !validated) {
			setError('Invalid or missing credentials');
			return false;
		}

		if (completed) {
			setError('Set has already been completed');
			return false;
		}

		if (!inProgress) {
			setError('Match is not in progress');
			return false;
		}

		console.log('Resetting set...');

		// TODO: success vs error
		const result = await sendMutation(key, resetSetMutation(match.id));
		console.log(result);
		if (result?.data) {
			// Update match
			dispatch(
				updateMatch(match.id, {
					startedAt: 0,
					state: result?.data?.markSetInProgress?.state ?? 1
				})
			);
			return true;
		}
		return false;
	};

	return (
		<Card borderColor={color}>
			<MatchCardHeader match={match} />
			<div className={classes.playerContent}>
				<PlayerContainer player={player1} match={match} />
				<PlayerContainer player={player2} match={match} />
			</div>
			<div className={cardClasses.splitFooter}>
				<div
					className={mergeClasses(cardClasses.textContent, classes.checkIn)}
					style={{
						color: color === 'black' ? tokens.colorNeutralForeground1 : color
					}}
				>
					<Caption2Strong>{status}</Caption2Strong>
					<Caption2>{infoText}</Caption2>
				</div>
				{inProgress && (
					<Menu positioning={'below-end'}>
						<MenuTrigger disableButtonEnhancement>
							{(triggerProps: MenuButtonProps) => (
								<SplitButton
									size="small"
									className={cardClasses.cardButton}
									icon={<TargetEdit16Regular />}
									iconPosition="after"
									primaryActionButton={{ onClick: () => setOpen(true) }}
									menuButton={triggerProps}
									disabled={loading || completed}
								>
									<Caption1>{!completed ? 'Report' : 'Modify'}</Caption1>
								</SplitButton>
							)}
						</MenuTrigger>
						<MenuPopover>
							<MenuList>
								<MenuItem icon={<ArrowReset20Regular />} onClick={() => resetSet()}>
									Reset Match
								</MenuItem>
							</MenuList>
						</MenuPopover>
					</Menu>
				)}
				{waiting && (
					<Button
						size="small"
						className={cardClasses.cardButton}
						icon={<MegaphoneLoud16Regular />}
						iconPosition="after"
						onClick={() => markSetInProgress()}
						disabled={loading}
					>
						<Caption1>Call Match</Caption1>
					</Button>
				)}
				<Dialog modalType="modal" open={open}>
					<MatchReportingDialog match={match} setOpen={setOpen} />
				</Dialog>
			</div>
		</Card>
	);
};

export default DashboardMatch;

interface MenuMatchProps {
	match: Match;
}

export const MenuMatch = ({ match }: MenuMatchProps) => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const { player1, player2 } = match;

	const handleClick = () => {
		dispatch(
			updateGameplay({
				matchType: match.bracket.bestOf ? `Best of ${match.bracket.bestOf}` : '',
				roundName: match.roundName ?? '',
				bracketName: match.bracket.name ?? ''
			})
		);
		dispatch(
			updatePlayer('player1', {
				tag: player1.tag ?? 'Player 1',
				score: player1.score ?? 0,
				team: player1.team ?? '',
				pronoun: player1.pronoun ?? '',
				character: player1.character ?? 'Default'
			})
		);
		dispatch(
			updatePlayer('player2', {
				tag: player2.tag ?? 'Player 2',
				score: player2.score ?? 0,
				team: player2.team ?? '',
				pronoun: player2.pronoun ?? '',
				character: player2.character ?? 'Default'
			})
		);
	};

	const color =
		match.stream !== null && match.state === 2
			? tokens.colorPaletteRedBackground3
			: match.stream !== null
				? tokens.colorPaletteRedBackground2
				: match.state === 3
					? 'black'
					: match.state === 2
						? tokens.colorPaletteMarigoldBackground3
						: tokens.colorPaletteGreenForeground1;

	return (
		<div className={classes.menuItemContainer} onClick={handleClick}>
			<div className={classes.menuItemBorder} style={{ backgroundColor: color }} />
			<div className={classes.menuItemContent}>
				<MatchCardHeader match={match} />
				<div className={classes.playerContent}>
					<PlayerContainer player={player1} match={match} />
					<PlayerContainer player={player2} match={match} />
				</div>
			</div>
		</div>
	);
};
