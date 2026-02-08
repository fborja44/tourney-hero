export interface LuckyStatsSession {
	id: string;
	createdAt: string; // Date
	updatedAt: string; // Date
}

export interface LuckyStatsTournament {
	slug: string | null;
	name: string | null;
}

export interface LuckyStatsPlayer {
	id: string | null;
	elo: number | null;
	country: string | null;
	gamerTag: string | null;
	luckyRank: {
		rank: number | null;
		points: number | null;
	};
	mainCharacter: number | null;
	primaryRegion: string | null;
	tournamentCount: number | null;
	characterOverride: number | null;
	characterId: number | null;
	characterName: string | null;
	regionEmoji: string | null;
}

export interface LuckyStatsPlayers {
	left: LuckyStatsPlayer;
	right: LuckyStatsPlayer;
}

export interface LuckyStatsH2H {
	player1Wins: number | null;
	player2Wins: number | null;
	totalSets: number | null;
	lastPlayedDate: string | null; // Date
	recentSets: LuckyStatsSet[];
}

export interface LuckyStatsSet {
	id: string | null;
	winner: 'player1' | 'player2';
	score: string | null;
	tournamentName: string | null;
	eventName: string | null;
	completedAt: string | null; // Date
}

export interface LuckyStatsWinProbability {
	left: number | null;
	right: number | null;
}

export interface LuckyStatsPlayerCardOptions {
	layout: string | null;
	showElo: boolean;
	eloStyle: string | null;
	logoShape: string | null;
	showRegion: boolean;
	colorScheme: string | null;
	showCharacter: boolean;
	showLuckyRank: boolean;
}

export interface LuckyStatsData {
	session: LuckyStatsSession;
	tournament: LuckyStatsTournament;
	players: LuckyStatsPlayers;
	h2h: LuckyStatsH2H;
	winProbability: LuckyStatsWinProbability;
	playerCardOptions: LuckyStatsPlayerCardOptions;
}
