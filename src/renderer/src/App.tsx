import { FluentProvider, webDarkTheme } from '@fluentui/react-components';

function App(): JSX.Element {
	// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

	return (
		<FluentProvider theme={webDarkTheme}>
			<div>Hello</div>
		</FluentProvider>
	);
}

export default App;
