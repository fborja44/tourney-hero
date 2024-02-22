import { createAction } from '@reduxjs/toolkit';
import {
	Entrant,
	Match,
	Tournament,
	TournamentEvent,
} from '../../interfaces/Types';

export const setKey = createAction('SET_KEY', (key: string, valid: boolean) => {
	return { payload: { key, valid } };
});

export const setTournamentFields = createAction(
	'SET_TOURNAMENT_FIELDS',
	(tournamentSlug: string, tournament: Tournament | undefined) => {
		return {
			payload: { tournamentSlug, tournament },
		};
	}
);

export const setEventSlug = createAction(
	'SET_EVENT_SLUG',
	(eventSlug: string) => {
		return { payload: eventSlug };
	}
);

export const setSelectedEvent = createAction(
	'SET_EVENT',
	(event: TournamentEvent | undefined) => {
		return { payload: event };
	}
);

export const setMatches = createAction('SET_MATCHES', (matches: Match[]) => {
	return {
		payload: matches,
	};
});

export const addMatches = createAction('ADD_MATCHES', (newMatches: Match[]) => {
	return {
		payload: newMatches,
	};
});

export const setMatchesLoading = createAction(
	'SET_MATCHES_LOADING',
	(loading: boolean) => {
		return {
			payload: loading,
		};
	}
);

export const updateMatch = createAction(
	'UPDATE_MATCH',
	(matchId: string, updatedMatchData: Partial<Match>) => {
		return {
			payload: { matchId, updatedMatchData },
		};
	}
);

export const setMatchesError = createAction(
	'SET_MATCHES_ERROR',
	(error: string | null) => {
		return {
			payload: error,
		};
	}
);

export const setEntrantsLoading = createAction(
	'SET_ENTRANTS_LOADING',
	(loading: boolean) => {
		return {
			payload: loading,
		};
	}
);

export const setEntrantsError = createAction(
	'SET_ENTRANTS_ERROR',
	(error: string | null) => {
		return {
			payload: error,
		};
	}
);

export const setEntrants = createAction(
	'SET_ENTRANTS',
	(entrants: Entrant[]) => {
		return {
			payload: entrants,
		};
	}
);

export const addEntrants = createAction(
	'ADD_ENTRANTS',
	(newEntrants: Entrant[]) => {
		return {
			payload: newEntrants,
		};
	}
);

export const setAutoRefresh = createAction(
	'SET_AUTO_REFRESH',
	(value: boolean) => {
		return {
			payload: value,
		};
	}
);
