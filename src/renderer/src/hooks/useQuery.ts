import { useState } from 'react';
import axios from 'axios';
import { generateHeader } from '../utils/tournament';
import { Query } from '../interfaces/Types';

/**
 * Start.gg API Query hook.
 * Errors must be set manually.
 */
const useQuery = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Fetches start.gg tournament data.
	 * @param key start.gg API key
	 * @param query The graphql query
	 * @returns The data object if successful. Otherwise, returns null.
	 */
	const fetchData = async (key: string, query: Query) => {
		const header = generateHeader(key);
		setLoading(true);
		try {
			const { data: requestData } = await axios({
				url: '/gql/alpha',
				method: 'POST',
				baseURL: 'https://api.start.gg',
				headers: header,
				data: query
			});
			setData(requestData);
			setLoading(false);
			return requestData;
		} catch (err) {
			console.error('Failed to fetch data from start.gg.');
			console.error(err);
			setLoading(false);
			return null;
		}
	};

	return { data, setData, loading, setLoading, error, setError, fetchData };
};

export default useQuery;
