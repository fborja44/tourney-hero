import { AppState } from '@renderer/redux/reducers/rootReducer';
import { TournamentState } from '@renderer/redux/reducers/tournamentReducer';
import { useSelector } from 'react-redux';
import ActionButton from '../ActionButton';
import { Trophy20Regular } from '@fluentui/react-icons';
import TournamentMenu from './TournamentMenu';

const TournamentActionButton = () => {
	const tournamentState: TournamentState = useSelector(
		(state: AppState) => state.tournamentState
	);
	const tournamentLabel = tournamentState.validated
		? tournamentState.tournamentSlug || 'Not Configured'
		: 'API Key Not Set';

	return (
		<ActionButton
			icon={Trophy20Regular}
			title={tournamentState.selectedEvent?.name ?? 'start.gg Tournament'}
			menu={<TournamentMenu />}
		>
			{tournamentLabel}
		</ActionButton>
	);
};

export default TournamentActionButton;
