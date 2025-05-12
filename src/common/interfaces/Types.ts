import { DocumentNode } from 'graphql';
import React, { JSX } from 'react';

export type Port = 'Red' | 'Blue' | 'Yellow' | 'Green' | 'None';

export type SlippiCharacter = {
	name: Character;
	internalId: CharacterId;
	externalId: CharacterId;
};

export type SlippiStage = {
	name: Stage;
	internalId: CharacterId;
	externalId: CharacterId;
};

export type CharacterId = number | null;

export type Character =
	| 'Bowser'
	| 'Captain Falcon'
	| 'Donkey Kong'
	| 'Dr. Mario'
	| 'Falco'
	| 'Fox'
	| 'Ganondorf'
	| 'Ice Climbers'
	| 'Jigglypuff'
	| 'Kirby'
	| 'Link'
	| 'Luigi'
	| 'Mario'
	| 'Marth'
	| 'Mewtwo'
	| 'Mr. Game & Watch'
	| 'Ness'
	| 'Peach'
	| 'Pichu'
	| 'Pikachu'
	| 'Roy'
	| 'Samus'
	| 'Sheik'
	| 'Yoshi'
	| 'Young Link'
	| 'Zelda'
	| 'Default';

export type Stage =
	| 'Fountain of Dreams'
	| 'Pokémon Stadium'
	| "Princess Peach's Castle"
	| 'Kongo Jungle'
	| 'Brinstar'
	| 'Corneria'
	| "Yoshi's Story"
	| 'Onett'
	| 'Mute City'
	| 'Rainbow Cruise'
	| 'Jungle Japes'
	| 'Great Bay'
	| 'Hyrule Temple'
	| 'Brinstar Depths'
	| "Yoshi's Island"
	| 'Green Greens'
	| 'Fourside'
	| 'Mushroom Kingdom I'
	| 'Mushroom Kingdom II'
	| 'Akaneia'
	| 'Venom'
	| 'Poké Floats'
	| 'Big Blue'
	| 'Icicle Mountain'
	| 'Icetop'
	| 'Flat Zone'
	| 'Dream Land N64'
	| "Yoshi's Island N64"
	| 'Kongo Jungle N64'
	| 'Battlefield'
	| 'Final Destination'
	| 'Unknown';

export interface Tournament {
	id: string;
	name: string;
	imageUrl: string;
	events: TournamentEvent[];
}

export interface TournamentEvent {
	id: string;
	name: string;
	slug: string;
	phases: string[];
}

export interface Match {
	id: number;
	identifier: string;
	hasPlaceholder: string;
	round: number;
	roundName: string;
	slug: string;
	bracket: {
		name: string;
		bestOf: number;
	};
	player1: Entrant;
	player2: Entrant;
	startAt: number;
	startedAt: number | null;
	completedAt: number | null;
	winnerId: number | null;
	state: 0 | 1 | 2 | 3 | 4;
	stream: string | null;
}

export interface Entrant {
	id: number;
	tag: string;
	team: string;
	pronoun: string;
	imageUrl: string | null;
	characterId?: number;
	score?: number | null;
	isWinner?: boolean;
	seed?: number | null;
}

export interface PlayerCardMatch {
	player1Tag: string;
	player1Score: number;
	player2Tag: string;
	player2Score: number;
	roundName: string;
}

export interface PlayerCardPlacement {
	placement: number;
	iconSrc: string;
	name: string;
}

export interface BrowserSource {
	sourceName: string;
	endpoint: string;
	shutdown?: boolean;
	width?: number;
	height?: number;
}

export interface SceneData {
	title: string;
	icon: React.ReactNode | JSX.Element;
	panel: React.ReactNode;
	source: BrowserSource;
	peripheralSources?: BrowserSource[];
}

export interface StartQuery {
	query: DocumentNode;
	variables?: object;
	operation?: string;
}

// TODO: characters
export interface MutationGameData {
	winnerId: number;
	gameNum: number;
	entrant1Score?: number;
	entrant2Score?: number;
	stageId?: number;
}

export interface InputValidation {
	status: 'error' | 'none' | 'success' | 'warning' | undefined;
	message: string | undefined;
}

export interface ReplayPlayer {
	name: string | null | undefined;
	code: string | null | undefined;
	stocksRemaining: number;
	characterId: number;
	port: Port;
	winner: boolean;
}

export interface ReplayData {
	isOnline: boolean;
	platform: string | null | undefined;
	fileName: string;
	player1: ReplayPlayer;
	player2: ReplayPlayer;
	stageId: number;
	date: Date | null | undefined;
	lastFrame: number | null | undefined;
}
