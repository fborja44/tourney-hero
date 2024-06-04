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
import { Scene } from '@common/interfaces/Types';
import GameplayForm from '@renderer/components/form/GameplayForm';
import CommentatorsForm from '@renderer/components/form/CommentatorsForm';
import BracketForm from '@renderer/components/form/BracketForm';
import PlayerCardForm from '@renderer/components/form/PlayerCardForm';
import StatsForm from '@renderer/components/form/StatsForm';
import { BackgroundBrowserSource } from '@renderer/obs/sources';
// import EmptyPanel from '@renderer/components/panel/EmptyPanel';

export type ScenesState = Scene[];

const initialState: ScenesState = [
	{
		title: 'Gameplay',
		icon: <XboxController20Regular />,
		panel: <GameplayForm />,
		endpoint: '/'
	},
	{
		title: 'Commentators',
		icon: <Mic20Regular />,
		panel: <CommentatorsForm />,
		endpoint: '/commentators'
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
		endpoint: '/player',
		peripheralSources: [BackgroundBrowserSource]
	},
	{
		title: 'Statistics',
		icon: <DataBarVertical20Regular />,
		panel: <StatsForm />,
		endpoint: '/stats'
	},
	{
		title: 'Bracket',
		icon: <BranchFork20Regular />,
		panel: <BracketForm />,
		endpoint: '/bracket',
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
