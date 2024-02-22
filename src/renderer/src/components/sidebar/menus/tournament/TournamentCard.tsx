import {
	Button,
	Caption1,
	Caption2,
	Persona,
	Tooltip,
	makeStyles,
	shorthands
} from '@fluentui/react-components';
import { ArrowSync16Regular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import { MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/reducers/rootReducer';

const useStyles = makeStyles({
	tournamentContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		backgroundColor: tokens.colorNeutralBackground2,
		...shorthands.padding(
			tokens.spacingVerticalM,
			tokens.spacingHorizontalM,
			tokens.spacingVerticalM,
			tokens.spacingHorizontalL
		),
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3)
	},
	persona: {
		'& .fui-Avatar': {
			marginRight: tokens.spacingHorizontalM
		}
	}
});

interface TournamentCardProps {
	handleRefresh?: MouseEventHandler<HTMLButtonElement>;
}

const TournamentCard = ({ handleRefresh }: TournamentCardProps) => {
	const classes = useStyles();

	const { tournament, selectedEvent } = useSelector((state: AppState) => state.tournamentState);

	if (!tournament || !selectedEvent) {
		return null;
	}

	return (
		<div className={classes.tournamentContainer}>
			<Persona
				className={classes.persona}
				avatar={{ image: { src: tournament.imageUrl } }}
				primaryText={<Caption1>{tournament.name}</Caption1>}
				secondaryText={<Caption2>{selectedEvent.name}</Caption2>}
				textAlignment="center"
			/>
			<Tooltip content="Refresh Matches" relationship="label">
				<Button
					icon={<ArrowSync16Regular />}
					appearance="transparent"
					onClick={handleRefresh}
				/>
			</Tooltip>
		</div>
	);
};

export default TournamentCard;
