import { gql } from '@apollo/client';
import { StartQuery } from '@common/interfaces/Types';

const EVENT_ENTRANT_DATA_QUERY = gql`
	query EventEntrantDataQuery($id: ID!) {
		entrant(id: $id) {
			id
			initialSeedNum
			name
			paginatedSets(page: 1, perPage: 4, filters: { hideEmpty: true, state: [3] }) {
				nodes {
					id
					fullRoundText
					round
					state
					totalGames
					winnerId
					slots {
						id
						entrant {
							name
						}
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
					tournaments(
						query: { page: 1, perPage: 4, filter: { past: true, videogameId: [1] } }
					) {
						nodes {
							id
							name
							images(type: "profile") {
								url
								ratio
							}
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
