import { ReplayData } from '@common/interfaces/Types';
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
import { TimerFilled } from '@fluentui/react-icons';

const useStyles = makeStyles({
	container: {
		width: '250px'
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: tokens.colorNeutralBackground4Selected,
		...shorthands.padding(0, tokens.spacingHorizontalM),
		...shorthands.borderRadius(0, 0, tokens.borderRadiusMedium, tokens.borderRadiusMedium),
		...shorthands.border('1px', 'solid', tokens.colorNeutralStroke3)
	},
	playerContent: {
		display: 'flex',
		flexDirection: 'column',
		...shorthands.gap(tokens.spacingVerticalS)
	},
	matchInfo: {
		color: tokens.colorNeutralForeground2
	},
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
	playerContainer: {
		height: '25px',
		paddingLeft: tokens.spacingHorizontalMNudge,
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: tokens.colorNeutralBackground1,
		marginLeft: tokens.spacingHorizontalM,
		...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
		...shorthands.borderRadius(tokens.borderRadiusMedium)
	},
	playerScore: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '25px',
		fontSize: '13px',
		...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralStroke2)
	},
	menuItemContainer: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3),
		'&:hover': {
			backgroundColor: tokens.colorNeutralBackground3Hover,
			cursor: 'pointer'
		}
	},
	menuItemBorder: {
		backgroundColor: tokens.colorStatusSuccessForeground1,
		height: '100%',
		width: '4px'
	},
	menuItemContent: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		...shorthands.padding(0, tokens.spacingHorizontalM)
	},
	time: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: tokens.spacingHorizontalXS,
		'& svg': {
			color: tokens.colorNeutralForeground4
		}
	}
});

interface ReplayCardHeaderProps {
	replay: ReplayData;
}

export const ReplayCardHeader = ({ replay }: ReplayCardHeaderProps) => {
	const cardClasses = cardStyles();
	const classes = useStyles();

	return (
		<div className={cardClasses.textContent}>
			<div className={cardClasses.textContentRow}>
				<Caption2 className={classes.matchInfo}>Apr 19, 2024 - 6:58 PM</Caption2>
				<div className={classes.time}>
					<Caption2 className={classes.matchInfo}>3m 26s</Caption2>
					<TimerFilled />
				</div>
			</div>
			<div className={cardClasses.textContentRow}>
				<Caption1>Battlefield</Caption1>
			</div>
		</div>
	);
};

interface PlayerContainerProps {
	replay: ReplayData;
}

const PlayerContainer = ({ replay }: PlayerContainerProps) => {
	const classes = useStyles();

	// const isWinner = match.winnerId === player.id;

	return (
		<div className={classes.playerSlot}>
			<CharacterIcon character={'Falco'} className={classes.characterIcon} />
			<div className={classes.playerContainer}>
				<Caption1>FIZZI#36</Caption1>
				<Body1Strong className={classes.playerScore}>0</Body1Strong>
			</div>
		</div>
	);
};

const ReplayCard = () => {
	const classes = useStyles();
	const cardClasses = cardStyles();

	const handleClick = () => {
		// TODO
	};

	const replay: ReplayData = {
        id: '0',
        fileName: '',
        player1: undefined,
        player2: undefined,
        stage: '',
        date: undefined,
        lastFrame: 0
    };

	return (
		<div
			className={mergeClasses(classes.menuItemContainer, 'menu-item-container')}
			onClick={handleClick}
		>
			<div className={classes.menuItemContent}>
				<ReplayCardHeader replay={replay} />
				<div className={classes.playerContent}>
					<PlayerContainer replay={replay} />
					<PlayerContainer replay={replay} />
				</div>
				<div className={cardClasses.splitFooter}>
					<Caption2 className={cardClasses.caption}>replay_name.slp</Caption2>
				</div>
			</div>
		</div>
	);
};

export default ReplayCard;
