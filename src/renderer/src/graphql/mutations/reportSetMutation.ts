import { gql } from '@apollo/client';
import { MutationGameData, StartQuery } from '@common/interfaces/Types';

const REPORT_SET_DATA_MUTATION = gql`
	mutation reportSet(
		$setId: ID!
		$winnerId: ID!
		$gameData: [BracketSetGameDataInput]
		$isDQ: Boolean
	) {
		reportBracketSet(setId: $setId, winnerId: $winnerId, gameData: $gameData, isDQ: $isDQ) {
			id
			state
		}
	}
`;

const reportSetDataMutation = (
	setId: number,
	winnerId: number,
	gameData: MutationGameData[] | [],
	isDQ: boolean = false
): StartQuery => {
	return {
		query: REPORT_SET_DATA_MUTATION,
		variables: {
			setId,
			winnerId,
			gameData,
			isDQ
		}
	};
};

export default reportSetDataMutation;
