import { gql } from '@apollo/client';
import { StartQuery } from '@common/interfaces/Types';

const RESET_STATE_MUTATION = gql`
	mutation resetSet($setId: ID!) {
		resetSet(setId: $setId) {
			id
			state
		}
	}
`;

const resetSetMutation = (setId: number): StartQuery => {
	return {
		query: RESET_STATE_MUTATION,
		variables: {
			setId
		}
	};
};

export default resetSetMutation;
