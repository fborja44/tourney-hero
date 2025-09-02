import { PlayerData } from '@common/interfaces/Data';
import { useCallback, useEffect, useState } from 'react';

const useLocalPlayers = () => {
	const [playersList, setPlayersList] = useState<PlayerData[]>([]);

	const getPlayersList = useCallback(async () => {
		const result = await window.api.getPlayers();
		setPlayersList(result);
		return result;
	}, []);

	useEffect(() => {
		getPlayersList();
	}, []);

	return { playersList, setPlayersList, getPlayersList };
};

export default useLocalPlayers;
