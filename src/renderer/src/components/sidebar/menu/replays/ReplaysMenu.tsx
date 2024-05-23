import ReplayCard from '@renderer/components/cards/replay/ReplayCard';
import { useSelector } from 'react-redux';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import SidebarMenu from '../SidebarMenu';
import { Replay20Regular } from '@fluentui/react-icons';

const ReplaysMenu = () => {
	const { replayList, replayDir } = useSelector((state: AppState) => state.slippiState);

	return (
		<SidebarMenu
			placeholderIcon={<Replay20Regular />}
			placeholderText="Replay Directory Not Configured"
			empty={!replayList.length}
			disabled={!replayDir}
		>
			{replayList.map((replay) => (
				<ReplayCard key={replay.fileName} replay={replay} />
			))}
		</SidebarMenu>
	);
};

export default ReplaysMenu;
