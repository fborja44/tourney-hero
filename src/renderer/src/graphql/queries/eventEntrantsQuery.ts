import { gql } from '@apollo/client';
import { StartQuery } from '@common/interfaces/Types';

const EVENT_ENTRANTS_QUERY = gql`
	query EventEntrants($tournamentSlug: String!, $eventSlug: String!, $page: Int, $perPage: Int) {
		tournament(slug: $tournamentSlug) {
			events(filter: { slug: $eventSlug }) {
				id
				name
				entrants(query: { page: $page, perPage: $perPage }) {
					pageInfo {
						total
						totalPages
					}
					nodes {
						id
						participants {
							gamerTag
							prefix
							user {
								id
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
					}
				}
			}
		}
	}
`;

const eventEntrantsQuery = (
	tournamentSlug: string,
	eventSlug: string,
	page: number = 1,
	perPage: number = 10
): StartQuery => {
	return {
		query: EVENT_ENTRANTS_QUERY,
		variables: {
			tournamentSlug,
			eventSlug,
			page,
			perPage: perPage
		}
	};
};

export default eventEntrantsQuery;
