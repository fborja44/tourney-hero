import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import App from './App';

const router = createHashRouter([
	{
		path: '/',
		element: <App />
	}
]);

const AppProvider = () => {
	return (
		<FluentProvider theme={webDarkTheme}>
			<ReduxProvider store={store}>
				<RouterProvider router={router} />
			</ReduxProvider>
		</FluentProvider>
	);
};

export default AppProvider;
