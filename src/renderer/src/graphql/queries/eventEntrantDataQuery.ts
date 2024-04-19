import { gql } from '@apollo/client';
import { StartQuery } from '@common/interfaces/Types';

const EVENT_ENTRANT_DATA_QUERY = gql`
	query EventEntrantDataQuery($id: ID!) {
		entrant(id: $id) {
			id
			initialSeedNum
			name
			paginatedSets(page: 1, perPage: 5, filters: { hideEmpty: true, state: [3] }) {
				nodes {
					id
					fullRoundText
					round
					state
					totalGames
					winnerId
					slots {
						id
						standing {
							placement
							stats {
								score {
									value
								}
							}
						}
					}
				}
			}
			participants {
				gamerTag
				prefix
				user {
					id
					genderPronoun
					authorizations(types: [TWITTER, TWITCH]) {
						externalUsername
						stream {
							name
						}
						type
					}
					tournaments(query: { page: 1, perPage: 5, filter: { past: true } }) {
						nodes {
							id
							name
						}
					}
					location {
						id
						country
						state
					}
				}
			}
		}
	}
`;

const eventEntrantDataQuery = (id: number): StartQuery => {
	return {
		query: EVENT_ENTRANT_DATA_QUERY,
		variables: {
			id
		}
	};
};

export default eventEntrantDataQuery;
