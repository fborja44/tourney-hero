import { gql } from '@apollo/client';
import { StartQuery } from '@common/interfaces/Types';

const EVENT_QUERY = gql`
	query TournamentQuery($tournamentSlug: String, $eventSlug: String) {
		tournament(slug: $tournamentSlug) {
			id
			name
			images(type: "profile") {
				url
			}
			events(filter: { slug: $eventSlug }) {
				id
				name
			}
		}
	}
`;

const eventQuery = (tournamentSlug: string, eventSlug: string): StartQuery => {
	return {
		query: EVENT_QUERY,
		variables: {
			tournamentSlug,
			eventSlug
		}
	};
};

export default eventQuery;
