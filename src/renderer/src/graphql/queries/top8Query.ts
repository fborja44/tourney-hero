import { gql } from '@apollo/client';
import { StartQuery } from '@common/interfaces/Types';

const TOP_8_QUERY = gql`
	query Top8($tournamentSlug: String!, $eventSlug: String!, $page: Int, $perPage: Int) {
		tournament(slug: $tournamentSlug) {
			id
			events(filter: { slug: $eventSlug }) {
				id
				name
				phases {
					id
					name
					sets(page: $page, perPage: $perPage, sortType: ROUND) {
						nodes {
							id
							fullRoundText
							completedAt
							startedAt
							round
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
									name
								}
							}
						}
					}
				}
			}
		}
	}
`;

const top8Query = (
	tournamentSlug: string,
	eventSlug: string,
	page: number = 1,
	perPage: number = 10
): StartQuery => {
	return {
		query: TOP_8_QUERY,
		variables: {
			tournamentSlug,
			eventSlug,
			page,
			perPage: perPage
		}
	};
};

export default top8Query;
