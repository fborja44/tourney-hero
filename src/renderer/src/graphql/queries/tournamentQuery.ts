import { gql } from '@apollo/client';
import { StartQuery } from '@common/interfaces/Types';

const TOURNAMENT_QUERY = gql`
	query TournamentQuery($tournamentSlug: String) {
		tournament(slug: $tournamentSlug) {
			id
			name
			images(type: "profile") {
				url
			}
			events(limit: 12, filter: { videogameId: [1] }) {
				id
				name
				slug
				state
			}
		}
	}
`;

const tournamentQuery = (tournamentSlug: string): StartQuery => {
	return {
		query: TOURNAMENT_QUERY,
		variables: {
			tournamentSlug
		}
	};
};

export default tournamentQuery;
