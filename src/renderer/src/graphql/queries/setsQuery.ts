import { gql } from '@apollo/client';
import { StartQuery } from '@common/interfaces/Types';

const MATCHES_QUERY = gql`
	query MatchesQuery(
		$tournamentSlug: String!
		$eventSlug: String!
		$page: Int
		$perPage: Int
		$entrantIds: [ID]
	) {
		tournament(slug: $tournamentSlug) {
			id
			events(filter: { slug: $eventSlug }) {
				id
				name
				sets(
					page: $page
					perPage: $perPage
					sortType: MAGIC
					filters: { showByes: false, hideEmpty: true, entrantIds: $entrantIds }
				) {
					pageInfo {
						totalPages
					}
					nodes {
						id

						startAt
						startedAt
						completedAt

						winnerId
						state

						stream {
							id
							streamName
							enabled
						}

						identifier
						round
						hasPlaceholder
						fullRoundText
						phaseGroup {
							wave {
								identifier
							}
							phase {
								name
							}
							rounds {
								bestOf
							}
						}
						totalGames
						games {
							selections {
								selectionType
								selectionValue
								entrant {
									id
								}
							}
						}
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
							entrant {
								id
								participants {
									gamerTag
									prefix
									user {
										genderPronoun
										authorizations(types: [TWITTER]) {
											id
											externalUsername
											type
										}
										images(type: "profile") {
											url
										}
									}
								}
								initialSeedNum
							}
						}
					}
				}
			}
		}
	}
`;

const setsQuery = (
	tournamentSlug: string,
	eventSlug: string,
	page: number = 1,
	perPage: number = 10,
	entrantIds: number[] = []
	// stateFilters: number[] = [1, 2, 3]
): StartQuery => {
	return {
		query: MATCHES_QUERY,
		variables: {
			tournamentSlug,
			eventSlug,
			page,
			perPage: perPage,
			entrantIds
			// stateFilters: stateFilters
		}
	};
};

export default setsQuery;
