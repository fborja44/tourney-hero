import { Query } from '@common/interfaces/Types';

const MATCHES_QUERY = `
	query MatchesQuery($tournamentSlug: String!, $eventSlug: String!, $page: Int, $perPage: Int) {
		tournament(slug: $tournamentSlug) {
			id
			events (filter: {
				slug: $eventSlug
			}) {
				id
				name
				sets(page: $page 
					perPage: $perPage
					sortType: MAGIC
					filters: {
						showByes: false
						hideEmpty: true
					}) {
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
										authorizations (types: [TWITTER]) {
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
`;

const matchesQuery = (
	tournamentSlug: string,
	eventSlug: string,
	page: number = 1,
	perPage: number = 10
): Query => {
	return {
		query: MATCHES_QUERY,
		variables: {
			tournamentSlug,
			eventSlug,
			page,
			perPage: perPage
		}
	};
};

export default matchesQuery;
