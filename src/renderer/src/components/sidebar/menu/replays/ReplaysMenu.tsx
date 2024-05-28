import ReplayCard from '@renderer/components/cards/replay/ReplayCard';
import { useSelector } from 'react-redux';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import SidebarMenu from '../SidebarMenu';
import { Replay20Regular } from '@fluentui/react-icons';
import { useState } from 'react';

const ReplaysMenu = () => {
	const { replayList, replayDir, selectedReplays } = useSelector(
		(state: AppState) => state.replayState
	);

	const [searchTerm, setSearchTerm] = useState('');
	const [searchLoading, setSearchLoading] = useState(false);

	return (
		<SidebarMenu
			placeholderIcon={<Replay20Regular />}
			placeholderText="Replay Directory Not Configured"
			empty={!replayList.length}
			disabled={!replayDir}
			searchTerm={searchTerm}
			setSearchTerm={setSearchTerm}
		>
			{replayList.map((replay) => (
				<ReplayCard
					key={replay.fileName}
					replay={replay}
					selected={selectedReplays.includes(replay.fileName)}
				/>
			))}
		</SidebarMenu>
	);
};

export default ReplaysMenu;
