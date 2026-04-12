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

export interface LuckyStatsPlayerItem {
	id: string | null;
	gamerTag: string | null;
	startggUserId: string | null;
	elo: number | null;
	country: string | null;
	primaryRegion: string | null;
	regionEmoji: string | null;
	luckyRank: {
		rank: number | null;
		points: number | null;
	};
	mainCharacter: number | null;
	characterId: number | null;
	characterName: string | null;
	tournamentCount: number | null;
}

// Matchup response
export interface LuckyStatsMatchupResponse {
	ok: boolean;
	order?: string[];

	labels: {
		player1: string | null;
		player2: string | null;
	};

	h2h: {
		player1Wins: number | null;
		player2Wins: number | null;
		totalSets: number | null;
		lastPlayedAt: string | null; // JoiIsoDateString
		firstPlayedAt: string | null; // JoiIsoDateString
		recentSets: LuckyStatsMatchupSet[];
	};

	winProbability: {
		glickoOnly: {
			player1: number | null;
			player2: number | null;
		};
		blended: {
			player1: number | null;
			player2: number | null;
		};
		note: string | null;
	};

	comparison: {
		ratingDifference: number | null;
		higherRatedSide: string | null;
		luckyRankDifference: null;
		betterLuckyRankSide: null;
		careerTotalSets: {
			player1: number | null;
			player2: number | null;
		};
		glickoRank: {
			player1: number | null;
			player2: number | null;
		};
	};

	matchupMeta: {
		distinctTournaments: number | null;
		setsOffline: number | null;
		setsOnline: number | null;
		avgGameDifferentialPlayer1: null;
		daysSinceLastMatch: null;
		activeWinStreakFromMostRecentSet: null;
		longestWinStreaks: {
			player1: number | null;
			player2: number | null;
		};
	};

	estimatedGlickoAfterNextSet: {
		method: string | null;
		tau: number | null;
		note: string | null;

		ifPlayer1Wins: LuckyStatsGlickoScenario;
		ifPlayer2Wins: LuckyStatsGlickoScenario;
	};
}

export interface LuckyStatsGlickoScenario {
	player1: LuckyStatsGlickoPlayer;
	player2: LuckyStatsGlickoPlayer;
}

export interface LuckyStatsGlickoPlayer {
	ratingBefore: number | null;
	ratingAfter: number | null;
	ratingDelta: number | null;
	rdBefore: number | null;
	rdAfter: number | null;
	volatilityBefore: number | null;
	volatilityAfter: number | null;
}

// Matchup data
export interface LuckyStatsMatchupSet {
	id: string | null;
	winner: 'player1' | 'player2';
	score: string | null;
	tournamentName: string | null;
	eventName: string | null;
	fullRoundText: string | null;
	completedAt: string | null;
	isOnline: boolean;
}

export interface LuckyStatsMatchupWin {
	player1: {
		ratingDelta: number | null;
	};
	player2: {
		ratingDelta: number | null;
	};
}

export interface LuckyStatsWinProbabilityData {
	glickoOnly: {
		player1: number | null;
		player2: number | null;
	};
	blended: {
		player1: number | null;
		player2: number | null;
	};
}

export interface LuckyStatsMatchupH2H {
	player1Wins: number | null;
	player2Wins: number | null;
	totalSets: number | null;
	recentSets: LuckyStatsMatchupSet[];
}

export interface LuckyStatsMatchup {
	h2h: LuckyStatsMatchupH2H;
	ifPlayer1Wins: LuckyStatsMatchupWin;
	ifPlayer2Wins: LuckyStatsMatchupWin;
	winProbability: LuckyStatsWinProbabilityData;
}
