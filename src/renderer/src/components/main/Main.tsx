import { makeStyles, shorthands } from '@fluentui/react-components';
import { ErrorBoundary } from 'react-error-boundary';
import EmptyPanel from '../panel/EmptyPanel';
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { resetOverlayData } from '@renderer/redux/actions/dataActions';
import { EmojiSad20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
	mainContainer: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row'
	},
	main: {
		display: 'flex',
		flexDirection: 'column',
		boxSizing: 'border-box',
		flexGrow: 1,
		...shorthands.overflow('hidden', 'auto')
	}
});

const Main = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	return (
		<div className={classes.mainContainer}>
			<Navbar />
			<ErrorBoundary
				fallbackRender={({ error, resetErrorBoundary }) => {
					console.error(error);
					return (
						<EmptyPanel
							text={'An error has occurred'}
							icon={<EmojiSad20Regular />}
							resetData={resetErrorBoundary}
						/>
					);
				}}
				onReset={() => {
					// Reset form data
					dispatch(resetOverlayData());
				}}
			>
				<main className={classes.main}>
					<Outlet />
				</main>
			</ErrorBoundary>
			<Sidebar />
		</div>
	);
};

export default Main;
