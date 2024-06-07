import { BrowserSource } from '@common/interfaces/Types';

export const GameplayBrowserSource: BrowserSource = {
	sourceName: 'Gameplay Browser Source',
	endpoint: '/',
	shutdown: true
};

export const CommentatorsBrowserSource: BrowserSource = {
	sourceName: 'Commentators Browser Source',
	endpoint: '/commentators',
	shutdown: true
};

export const PlayerCardBrowserSource: BrowserSource = {
	sourceName: 'Player Card Browser Source',
	endpoint: '/player',
	shutdown: true
};

export const StatisticsBrowserSource: BrowserSource = {
	sourceName: 'Statistics Browser Source',
	endpoint: '/stats',
	shutdown: true
};

export const BracketBrowserSource: BrowserSource = {
	sourceName: 'Bracket Browser Source',
	endpoint: '/bracket',
	shutdown: true
};

export const BackgroundBrowserSource: BrowserSource = {
	sourceName: 'Background Browser Source',
	endpoint: '/background',
	shutdown: false
};
