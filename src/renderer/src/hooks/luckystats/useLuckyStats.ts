import { JoiLuckyStatsPlayerItemSchema } from '@common/validator/JoiLuckyStats';
import axios from 'axios';
import { useState } from 'react';

const LUCKY_STATS_API_BASE_URL = 'https://luckystats.gg/api'; // Placeholder URL

const useLuckyStats = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Fetches Lucky Stats data by session key.
	 * @param key Lucky Stats session key
	 * @returns The data object if successful. Otherwise, returns null.
	 */
	const fetchLuckyStatsSessionData = async (key: string) => {
		try {
			setLoading(true);
			const response = await axios.get(
				`${LUCKY_STATS_API_BASE_URL}/stream/session/${key}/data`
			);

			if (response.status !== 200) {
				throw new Error('Invalid response from Lucky Stats API');
			}

			// Validate Response
			if (JoiLuckyStatsPlayerItemSchema.validate(response.data)) {
				setData(response.data);
			} else {
				throw new Error('Invalid data format from Lucky Stats API');
			}
			setLoading(false);
			return response;
		} catch (err) {
			console.error(err);
			setError('Failed to fetch Lucky Stats data.');
			setLoading(false);
			return null;
		}
	};

	/**
	 * Fetches Lucky Stats data by player ids.
	 * @param playerIds A list of start.gg player ids to fetch data for
	 * @returns The data object if successful. Otherwise, returns null.
	 */
	const fetchLuckyStatsPlayerData = async (playerIds: number[]) => {
		try {
			setLoading(true);
			const response = await axios.get(
				`${LUCKY_STATS_API_BASE_URL}/stream/players?ids=${playerIds.join(',')}`
			);
			// TODO: Validate response
			console.log(response);
			if (response.status !== 200) {
				throw new Error('Error fetching player data from Lucky Stats API');
			}
			setData(response.data);
			setLoading(false);
			return response;
		} catch (err) {
			console.error(err);
			setError('Failed to fetch Lucky Stats data.');
			setLoading(false);
			return null;
		}
	};

	return {
		data,
		setData,
		loading,
		setLoading,
		error,
		setError,
		fetchLuckyStatsSessionData,
		fetchLuckyStatsPlayerData
	};
};

export default useLuckyStats;
