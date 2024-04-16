import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import logger from 'redux-logger';

const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		import.meta.env.DEV
			? getDefaultMiddleware({
					immutableCheck: false,
					serializableCheck: false
				}).concat(logger) // Logger only on DEV mode
			: getDefaultMiddleware({
					immutableCheck: false,
					serializableCheck: false
				})
});

export default store;
