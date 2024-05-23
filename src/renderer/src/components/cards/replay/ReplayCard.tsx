import { ReplayData, ReplayPlayer } from '@common/interfaces/Types';
import {
	Body1Strong,
	Caption1,
	Caption2,
	makeStyles,
	mergeClasses,
	shorthands,
	tokens
} from '@fluentui/react-components';
import cardStyles from '@renderer/components/card/styles/CardStyles';
import CharacterIcon from '@renderer/components/character/CharacterIcon';
import { CrownFilled, TimerFilled } from '@fluentui/react-icons';
import { getSlippiCharacter, getSlippiStage } from '@common/constants/slippi-utils';
import { formatFrames } from '@renderer/utils/date';
import menuItemStyles from '../styles/MenuItemStyles';
import { characterToString } from '@renderer/utils/string';

const useStyles = makeStyles({
	characterIcon: {
		position: 'absolute'
	},
	playerSlot: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
		width: '100%'
	},
	replayPlayerContainer: {
		paddingLeft: tokens.spacingHorizontalMNudge,
		marginLeft: tokens.spacingHorizontalM
	},
	time: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: tokens.spacingHorizontalXS,
		'& svg': {
			color: tokens.colorNeutralForeground4
		}
	},
	fileName: {
		textOverflow: 'ellipsis',
		...shorthands.overflow('hidden', 'hidden')
	},
	stageIcon: {
		width: '38px',
		height: '30px',
		objectFit: 'cover',
		right: tokens.spacingHorizontalM,
		...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
		...shorthands.borderRadius(tokens.borderRadiusMedium)
	},
	crown: {
		color: tokens.colorPaletteMarigoldBackground3
	}
});

interface ReplayDataProps {
	replay: ReplayData;
}

export const ReplayCardHeader = ({ replay }: ReplayDataProps) => {
	const classes = useStyles();
	const cardClasses = cardStyles();
	const itemClasses = menuItemStyles();

	return (
		<div className={cardClasses.textContent}>
			<div className={cardClasses.textContentRow}>
				<div className={cardClasses.textContentCol}>
					<Caption2 className={itemClasses.matchInfo}>
						{replay.date?.toLocaleDateString('en-US', {
							month: 'short',
							day: '2-digit',
							year: 'numeric',
							hour: 'numeric',
							minute: '2-digit',
							hour12: true
						})}
					</Caption2>
					<Caption1>{getSlippiStage(replay.stageId)}</Caption1>
				</div>
				<img
					className={classes.stageIcon}
					src={`/assets/stageicons/${encodeURIComponent(replay.stageId)}.png`}
				/>
			</div>
		</div>
	);
};

interface PlayerContainerProps {
	player: ReplayPlayer;
}

// TODO: CPU Player, Offline vs Online indicator
const PlayerContainer = ({ player }: PlayerContainerProps) => {
	const itemClasses = menuItemStyles();
	const classes = useStyles();

	// const isWinner = match.winnerId === player.id;
	const character = getSlippiCharacter(player.characterId);

	return (
		<div className={classes.playerSlot}>
			<CharacterIcon character={character} className={classes.characterIcon} />
			<div
				className={mergeClasses(itemClasses.playerContainer, classes.replayPlayerContainer)}
			>
				<Caption1 className={itemClasses.playerTagContainer}>
					<span>
						{player.code
							? player.code
							: player.name
								? player.name
								: player.characterId
									? characterToString(character)
									: 'Unknown'}
					</span>
					{player.winner && <CrownFilled className={classes.crown} />}
				</Caption1>
				<Body1Strong className={itemClasses.playerScore}>
					{player.stocksRemaining}
				</Body1Strong>
			</div>
		</div>
	);
};

const ReplayCard = ({ replay }: ReplayDataProps) => {
	const classes = useStyles();
	const cardClasses = cardStyles();
	const itemClasses = menuItemStyles();

	const handleClick = () => {
		// TODO
	};

	if (!replay || !replay.player1 || !replay.player2) {
		return null;
	}

	return (
		<div className={itemClasses.menuItemContainer} onClick={handleClick}>
			<div className={itemClasses.menuItemContent}>
				<ReplayCardHeader replay={replay} />
				<div className={itemClasses.playerContent}>
					<PlayerContainer player={replay.player1} />
					<PlayerContainer player={replay.player2} />
				</div>
				<div className={cardClasses.splitFooter}>
					<Caption2 className={mergeClasses(cardClasses.caption, classes.fileName)}>
						{replay.fileName}
					</Caption2>
					<div className={classes.time}>
						<Caption2 className={itemClasses.matchInfo}>
							{formatFrames(replay.lastFrame)}
						</Caption2>
						<TimerFilled />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReplayCard;
