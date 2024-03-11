import { ApolloClient, InMemoryCache } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

if (import.meta.env.DEV) {
	// Adds messages only in a dev environment
	loadDevMessages();
	loadErrorMessages();
}

const client = new ApolloClient({
	uri: 'https://api.start.gg/gql/alpha',
	cache: new InMemoryCache()
});

export default client;
