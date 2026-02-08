import axios from 'axios';
import { useState } from 'react';

const LUCKY_STATS_API_BASE_URL = 'https://luckystats.gg/api'; // Placeholder URL

const useLuckyStats = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Fetches Lucky Stats data.
	 * @param key Lucky Stats session key
	 * @returns The data object if successful. Otherwise, returns null.
	 */
	const fetchData = async (key: string) => {
		try {
			setLoading(true);
			const response = await axios.get(
				`${LUCKY_STATS_API_BASE_URL}/stream/session/${key}/data`
			);
			console.log(response);
			if (response.status !== 200) {
				throw new Error('Invalid response from Lucky Stats API');
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

	return { data, setData, loading, setLoading, error, setError, fetchData };
};

export default useLuckyStats;
