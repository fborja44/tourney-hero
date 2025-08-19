import SlippiIcon from '@renderer/components/icons/SlippiIcon';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';
import ActionButton from '../ActionButton';
import SlippiMenu from './SlippiMenu';

const SlippiActionButton = () => {
	const { connected: slippiConnected, activeGame } = useSelector(
		(state: AppState) => state.slippiState
	);

	return (
		<ActionButton
			icon={SlippiIcon}
			title="Slippi Connection"
			menu={<SlippiMenu />}
			color={activeGame ? 'success' : 'default'}
		>
			{activeGame !== null && slippiConnected
				? 'Game In-Progress'
				: slippiConnected
					? 'Waiting For Game...'
					: 'Not Configured'}
		</ActionButton>
	);
};

export default SlippiActionButton;
