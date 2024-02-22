import { createReducer } from '@reduxjs/toolkit';
import {
	addEntrants,
	addMatches,
	setAutoRefresh,
	setEntrants,
	setEntrantsError,
	setEntrantsLoading,
	setEventSlug,
	setKey,
	setMatches,
	setMatchesError,
	setMatchesLoading,
	setSelectedEvent,
	setTournamentFields,
	updateMatch,
} from '../actions/tournamentActions';
import {
	Entrant,
	Match,
	Tournament,
	TournamentEvent,
} from '../../interfaces/Types';

export interface TournamentState {
	key: string | undefined;
	validated: boolean;
	tournamentSlug: string;
	eventSlug: string;
	tournament: Tournament | undefined;
	selectedEvent: TournamentEvent | undefined;
	matches: {
		matchList: Match[];
		loading: boolean;
		error: string | null;
	};
	entrants: {
		entrantList: Entrant[];
		loading: boolean;
		error: string | null;
	};
	autoRefresh: boolean;
}

const initialState: TournamentState = {
	key: import.meta.env.VITE_START_GG_KEY ?? undefined,
	validated: false,
	tournamentSlug: 'full-house-2024',
	eventSlug: '',
	tournament: undefined,
	selectedEvent: undefined,
	matches: {
		matchList: [],
		loading: false,
		error: null,
	},
	entrants: {
		entrantList: [],
		loading: false,
		error: null,
	},
	autoRefresh: true,
};

const tournamentReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setKey, (state, action) => {
			state.key = action.payload.key;
			state.validated = action.payload.valid;
		})
		.addCase(setTournamentFields, (state, action) => {
			state.tournamentSlug = action.payload.tournamentSlug;
			state.tournament = action.payload.tournament;
		})
		.addCase(setEventSlug, (state, action) => {
			state.eventSlug = action.payload;
		})
		.addCase(setSelectedEvent, (state, action) => {
			state.selectedEvent = action.payload;
		})
		.addCase(setMatches, (state, action) => {
			state.matches.matchList = action.payload;
		})
		.addCase(addMatches, (state, action) => {
			state.matches.matchList = [...state.matches.matchList, ...action.payload];
		})
		.addCase(setMatchesLoading, (state, action) => {
			state.matches.loading = action.payload;
		})
		.addCase(setMatchesError, (state, action) => {
			state.matches.error = action.payload;
		})
		.addCase(updateMatch, (state, action) => {
			let newMatches = [...state.matches.matchList];
			state.matches.matchList = newMatches.map((match) => {
				if (match.id === action.payload.matchId) {
					return { ...match, ...action.payload.updatedMatchData };
				}
				return match;
			});
		})
		.addCase(setEntrants, (state, action) => {
			state.entrants.entrantList = action.payload;
		})
		.addCase(addEntrants, (state, action) => {
			state.entrants.entrantList = [
				...state.entrants.entrantList,
				...action.payload,
			];
		})
		.addCase(setEntrantsLoading, (state, action) => {
			state.entrants.loading = action.payload;
		})
		.addCase(setEntrantsError, (state, action) => {
			state.entrants.error = action.payload;
		})
		.addCase(setAutoRefresh, (state, action) => {
			state.autoRefresh = action.payload;
		});
});

export default tournamentReducer;
