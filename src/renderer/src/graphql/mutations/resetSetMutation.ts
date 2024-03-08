import { Query } from '@common/interfaces/Types';

const RESET_STATE_MUTATION = `
    mutation resetSet($setId: ID!) {
        resetSet(setId: $setId) {
            id
            state
        }
    },
`;

const resetSetMutation = (setId: number): Query => {
	return {
		query: RESET_STATE_MUTATION,
		variables: {
			setId
		}
	};
};

export default resetSetMutation;
