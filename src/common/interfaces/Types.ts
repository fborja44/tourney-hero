import { DocumentNode } from 'graphql';
import React, { JSX } from 'react';

export type Port = 'Red' | 'Blue' | 'Yellow' | 'Green' | 'None';

export type Character =
	| 'Bowser'
	| 'CaptainFalcon'
	| 'DonkeyKong'
	| 'DrMario'
	| 'Falco'
	| 'Fox'
	| 'Ganondorf'
	| 'IceClimbers'
	| 'Jigglypuff'
	| 'Kirby'
	| 'Link'
	| 'Luigi'
	| 'Mario'
	| 'Marth'
	| 'Mewtwo'
	| 'MrGameWatch'
	| 'Ness'
	| 'Peach'
	| 'Pichu'
	| 'Pikachu'
	| 'Roy'
	| 'Samus'
	| 'Sheik'
	| 'Yoshi'
	| 'YoungLink'
	| 'Zelda'
	| 'Default';

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
	character?: Character;
	score?: number | null;
	isWinner?: boolean;
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

export interface Scene {
	title: string;
	icon: React.ReactNode | JSX.Element;
	panel: React.ReactNode;
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
	name: string;
	code: string;
	stocksRemaining: string;
	character: string;
	port: Port;
	winner: boolean;
}

export interface ReplayData {
	id: string;
	fileName: string;
	player1: ReplayPlayer;
	player2: ReplayPlayer;
	stage: string;
	date: Date;
	lastFrame: number;
}