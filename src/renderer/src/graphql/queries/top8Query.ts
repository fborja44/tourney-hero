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
