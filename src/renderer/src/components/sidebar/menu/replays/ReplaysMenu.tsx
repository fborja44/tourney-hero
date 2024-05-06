import ReplayCard from '@renderer/components/cards/replay/ReplayCard';
import { useSelector } from 'react-redux';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import SidebarMenu from '../SidebarMenu';

const ReplaysMenu = () => {
	const { replayList } = useSelector((state: AppState) => state.slippiState);

	return (
		<SidebarMenu>
			{replayList.map((replay) => (
				<ReplayCard key={replay.fileName} replay={replay} />
			))}
		</SidebarMenu>
	);
};

export default ReplaysMenu;
