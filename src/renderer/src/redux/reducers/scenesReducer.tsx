import { createReducer } from '@reduxjs/toolkit';
import {
	// Ribbon20Regular,
	XboxController20Regular,
	Mic20Regular,
	BranchFork20Regular,
	VideoPersonRegular,
	// Timer20Regular,
	// People20Regular,
	// Money20Regular,
	// Camera20Regular,
	DataBarVertical20Regular
} from '@fluentui/react-icons';
import { SceneData } from '@common/interfaces/Types';
import GameplayForm from '@renderer/components/form/GameplayForm';
import CommentatorsForm from '@renderer/components/form/CommentatorsForm';
import BracketForm from '@renderer/components/form/BracketForm';
import PlayerCardForm from '@renderer/components/form/PlayerCardForm';
import StatsForm from '@renderer/components/form/StatsForm';
import {
	BackgroundBrowserSource,
	BracketBrowserSource,
	CommentatorsBrowserSource,
	GameplayBrowserSource,
	PlayerCardBrowserSource,
	StatisticsBrowserSource
} from '@renderer/obs/sources';
// import EmptyPanel from '@renderer/components/panel/EmptyPanel';

export type ScenesState = SceneData[];

const initialState: ScenesState = [
	{
		title: 'Gameplay',
		icon: <XboxController20Regular />,
		panel: <GameplayForm />,
		source: GameplayBrowserSource
	},
	{
		title: 'Commentators',
		icon: <Mic20Regular />,
		panel: <CommentatorsForm />,
		source: CommentatorsBrowserSource
	},
	// {
	// 	title: 'Intermission',
	// 	icon: <Timer20Regular />,
	// 	panel: <CommentatorsForm />
	// },
	{
		title: 'Player Card',
		icon: <VideoPersonRegular />,
		panel: <PlayerCardForm />,
		source: PlayerCardBrowserSource,
		peripheralSources: [BackgroundBrowserSource]
	},
	{
		title: 'Statistics',
		icon: <DataBarVertical20Regular />,
		panel: <StatsForm />,
		source: StatisticsBrowserSource
	},
	{
		title: 'Bracket',
		icon: <BranchFork20Regular />,
		panel: <BracketForm />,
		source: BracketBrowserSource,
		peripheralSources: [BackgroundBrowserSource]
	}
	// {
	// 	title: 'Players',
	// 	icon: <People20Regular />,
	// 	panel: <EmptyPanel />
	// },
	// {
	// 	title: 'Full Cam',
	// 	icon: <Camera20Regular />,
	// 	panel: <EmptyPanel />
	// },
	// {
	// 	title: 'Advertisement',
	// 	icon: <Money20Regular />,
	// 	panel: <EmptyPanel />
	// },
	// { title: 'Opening', icon: <Ribbon20Regular />, panel: <EmptyPanel /> }
];

const scenesReducer = createReducer(initialState, (builder) => {
	builder;
});

export default scenesReducer;
