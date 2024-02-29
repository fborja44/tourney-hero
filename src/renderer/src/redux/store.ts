import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import logger from 'redux-logger';

const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false
		}).concat(logger) // TODO: Logger only on dev,
});

export default store;
