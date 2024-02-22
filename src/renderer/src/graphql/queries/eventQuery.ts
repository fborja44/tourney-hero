import { Query } from "../../interfaces/Types";

const EVENT_QUERY = `
	query TournamentQuery($tournamentSlug: String, $eventSlug: String) {
		tournament(slug: $tournamentSlug){
    		id
    		name
    		images(type: "profile") {
				url
    		}
    		events(filter: {
    			slug: $eventSlug
    		}) {
    			id
    			name
    		}
		}
	}
`;

const eventQuery = (tournamentSlug: string, eventSlug: string): Query => {
	return {
		query: EVENT_QUERY,
		variables: {
			tournamentSlug,
			eventSlug,
		},
	};
};

export default eventQuery;
