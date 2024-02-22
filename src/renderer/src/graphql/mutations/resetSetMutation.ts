import { Query } from '../../interfaces/Types';

const RESET_STATE_MUTATION = `
    mutation resetSet($setId: ID!) {
        resetSet(setId: $setId) {
            id
            state
        }
    },
`;

const resetSetMutation = (setId: string): Query => {
	return {
		query: RESET_STATE_MUTATION,
		variables: {
			setId,
		},
	};
};

export default resetSetMutation;
