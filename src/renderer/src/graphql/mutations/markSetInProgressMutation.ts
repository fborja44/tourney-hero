import { StartQuery } from '@common/interfaces/Types';
import { gql } from '@apollo/client';

const MARK_SET_IN_PROGRESS_MUTATION = gql`
	mutation markSetInProgress($setId: ID!) {
		markSetInProgress(setId: $setId) {
			id
			state
		}
	}
`;

const markSetInProgressMutation = (setId: number): StartQuery => {
	return {
		query: MARK_SET_IN_PROGRESS_MUTATION,
		variables: {
			setId
		}
	};
};

export default markSetInProgressMutation;
