import { useState } from 'react';
import { generateHeader } from '../utils/tournament';
import { StartQuery } from '@common/interfaces/Types';
import client from '@renderer/graphql/client';

/**
 * Start.gg API GraqphQL hook.
 */
const useStartQuery = () => {
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
	const fetchData = async (key: string, query: StartQuery) => {
		try {
			const header = generateHeader(key);
			setLoading(true);
			const response = await client.query({ ...query, context: { headers: header } });
			setData(response.data);
			setLoading(false);
			return response;
		} catch (err) {
			console.error(err);
			setLoading(false);
			return null;
		}
	};

	/**
	 * Sends a start.gg mutation.
	 * @param key start.gg API key
	 * @param query The graphql mutation
	 * @returns The data object if successful. Otherwise, returns null.
	 */
	const sendMutation = async (key: string, query: StartQuery) => {
		try {
			const header = generateHeader(key);
			setLoading(true);
			const response = await client.mutate({
				mutation: query.query,
				variables: query.variables,
				context: { headers: header }
			});
			setData(response.data);
			setLoading(false);
			return response;
		} catch (err) {
			console.error(err);
			setLoading(false);
			return null;
		}
	};

	return { data, setData, loading, setLoading, error, setError, fetchData, sendMutation };
};

export default useStartQuery;
