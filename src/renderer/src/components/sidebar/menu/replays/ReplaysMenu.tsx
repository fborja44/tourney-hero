import ReplayCard from '@renderer/components/cards/replay/ReplayCard';
import { useSelector } from 'react-redux';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import SidebarMenu from '../SidebarMenu';
import { Replay20Regular } from '@fluentui/react-icons';
import { useState } from 'react';

const ReplaysMenu = () => {
	const { replayList, replayDir } = useSelector((state: AppState) => state.slippiState);

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
				<ReplayCard key={replay.fileName} replay={replay} />
			))}
		</SidebarMenu>
	);
};

export default ReplaysMenu;
