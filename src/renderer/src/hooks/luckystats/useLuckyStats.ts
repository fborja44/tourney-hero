import { JoiLuckyStatsPlayerItemSchema } from '@common/validator/JoiLuckyStats';
import { updateGameplay } from '@renderer/redux/actions/dataActions';
import { LuckyStatsState } from '@renderer/redux/reducers/luckyStatsReducer';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LUCKY_STATS_API_BASE_URL = 'https://luckystats.gg/api'; // Placeholder URL

const useLuckyStats = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const dispatch = useDispatch();

	const { isEnabled }: LuckyStatsState = useSelector((state: AppState) => state.luckyStatsState);

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

	/**
	 * Fetches and sets the matchup data for two players.
	 * @param player1Id The start.gg player id for player 1
	 * @param player2Id The start.gg player id for player 2
	 */
	const setMatchupData = async (player1Id?: number | null, player2Id?: number | null) => {
		if (!player1Id || !player2Id || !isEnabled) {
			dispatch(
				updateGameplay({
					matchup: null
				})
			);
			return;
		}

		const response = await fetchLuckyStatsPlayerData([player1Id, player2Id]);
		const matchup = response?.data?.matchup ?? null;

		dispatch(
			updateGameplay({
				matchup: matchup
					? {
							h2h: {
								player1Wins: matchup?.h2h?.player1Wins ?? null,
								player2Wins: matchup?.h2h?.player2Wins ?? null,
								totalSets: matchup?.h2h?.totalSets ?? null,
								recentSets: matchup?.h2h?.recentSets ?? []
							},
							ifPlayer1Wins: {
								player1: {
									ratingDelta:
										matchup?.estimatedGlickoAfterNextSet?.ifPlayer1Wins?.player1
											?.ratingDelta ?? null
								},
								player2: {
									ratingDelta:
										matchup?.estimatedGlickoAfterNextSet?.ifPlayer1Wins?.player2
											?.ratingDelta ?? null
								}
							},
							ifPlayer2Wins: {
								player1: {
									ratingDelta:
										matchup?.estimatedGlickoAfterNextSet?.ifPlayer2Wins?.player1
											?.ratingDelta ?? null
								},
								player2: {
									ratingDelta:
										matchup?.estimatedGlickoAfterNextSet?.ifPlayer2Wins?.player2
											?.ratingDelta ?? null
								}
							},
							winProbability: {
								glickoOnly: {
									player1: matchup?.winProbability?.glickoOnly?.player1 ?? null,
									player2: matchup?.winProbability?.glickoOnly?.player2 ?? null
								},
								blended: {
									player1: matchup?.winProbability?.blended?.player1 ?? null,
									player2: matchup?.winProbability?.blended?.player2 ?? null
								}
							}
						}
					: null
			})
		);
	};

	return {
		data,
		setData,
		loading,
		setLoading,
		error,
		setError,
		fetchLuckyStatsSessionData,
		fetchLuckyStatsPlayerData,
		setMatchupData
	};
};

export default useLuckyStats;
