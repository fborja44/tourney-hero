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
import GameplayForm from '@renderer/components/form/GameplayForm';
import CommentatorsForm from '@renderer/components/form/CommentatorsForm';
import BracketForm from '@renderer/components/form/BracketForm';
import { Scene } from '@common/interfaces/Types';
import PlayerCardForm from '@renderer/components/form/PlayerCardForm';
// import EmptyPanel from '@renderer/components/panel/EmptyPanel';
import StatsForm from '@renderer/components/form/StatsForm';

export type ScenesState = Scene[];

const initialState: ScenesState = [
	{
		title: 'Gameplay',
		icon: <XboxController20Regular />,
		panel: <GameplayForm />
	},
	{
		title: 'Commentators',
		icon: <Mic20Regular />,
		panel: <CommentatorsForm />
	},
	// {
	// 	title: 'Intermission',
	// 	icon: <Timer20Regular />,
	// 	panel: <CommentatorsForm />
	// },
	{
		title: 'Player Card',
		icon: <VideoPersonRegular />,
		panel: <PlayerCardForm />
	},
	{
		title: 'Statistics',
		icon: <DataBarVertical20Regular />,
		panel: <StatsForm />
	},
	{ title: 'Bracket', icon: <BranchFork20Regular />, panel: <BracketForm /> },
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
