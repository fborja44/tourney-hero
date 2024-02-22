import { Query } from '../../interfaces/Types';

const MARK_SET_IN_PROGRESS_MUTATION = `
    mutation markSetInProgress($setId: ID!) {
        markSetInProgress(setId: $setId) {
            id
            state
        }
    },
`;

const markSetInProgressMutation = (setId: string): Query => {
	return {
		query: MARK_SET_IN_PROGRESS_MUTATION,
		variables: {
			setId,
		},
	};
};

export default markSetInProgressMutation;
