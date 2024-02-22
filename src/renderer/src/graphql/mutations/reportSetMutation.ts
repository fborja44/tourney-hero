import { MutationGameData, Query } from '../../interfaces/Types';

const REPORT_SET_DATA_MUTATION = `
    mutation reportSet($setId: ID!, $winnerId: ID!, $gameData: [BracketSetGameDataInput], $isDQ: Boolean) {
        reportBracketSet(setId: $setId, winnerId: $winnerId, gameData: $gameData, isDQ: $isDQ) {
            id
            state
        }
    },
`;

const reportSetDataMutation = (
	setId: string,
	winnerId: string,
	gameData: MutationGameData[] | [],
	isDQ: boolean = false
): Query => {
	return {
		query: REPORT_SET_DATA_MUTATION,
		variables: {
			setId,
			winnerId,
			gameData,
			isDQ,
		},
	};
};

export default reportSetDataMutation;
