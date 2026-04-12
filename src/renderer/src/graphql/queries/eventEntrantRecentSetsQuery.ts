import { gql } from '@apollo/client';
import { StartQuery } from '@common/interfaces/Types';

const EVENT_ENTRANT_RECENT_SETS_QUERY = gql`
	query EntrantLast3Sets($tournamentSlug: String!, $eventSlug: String!, $entrantName: String!) {
		tournament(slug: $tournamentSlug) {
			events(filter: { slug: $eventSlug }) {
				id
				name
				entrants(query: { page: 0, perPage: 1, filter: { name: $entrantName } }) {
					pageInfo {
						total
						totalPages
					}
					nodes {
						id
						paginatedSets(page: 0, perPage: 3, sortType: RECENT) {
							pageInfo {
								total
							}
							nodes {
								id
								startedAt
								completedAt
								state
								hasPlaceholder
								fullRoundText
								phaseGroup {
									phase {
										name
									}
								}
								totalGames
								slots {
									id
									standing {
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
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

const eventEntrantRecentSetsQuery = (
	tournamentSlug: string,
	eventSlug: string,
	entrantName: string
): StartQuery => {
	return {
		query: EVENT_ENTRANT_RECENT_SETS_QUERY,
		variables: {
			tournamentSlug,
			eventSlug,
			entrantName
		}
	};
};

export default eventEntrantRecentSetsQuery;
