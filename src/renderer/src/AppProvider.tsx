import { FluentProvider, Toaster, webDarkTheme } from '@fluentui/react-components';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import App from './App';
import SocketClientProvider from './socket/SocketClientProvider';
import OBSWebSocketClientProvider from './obs-websocket/OBSWebsocketProvider';

const AppProvider = () => {
	return (
		<FluentProvider theme={webDarkTheme}>
			<ReduxProvider store={store}>
				<OBSWebSocketClientProvider>
					<SocketClientProvider>
						<Toaster toasterId={'toaster'} timeout={5 * 1000} pauseOnHover limit={3} />
						<App />
					</SocketClientProvider>
				</OBSWebSocketClientProvider>
			</ReduxProvider>
		</FluentProvider>
	);
};

export default AppProvider;
