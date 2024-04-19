import { makeStyles, shorthands } from '@fluentui/react-components';
import { ErrorBoundary } from 'react-error-boundary';
import EmptyPanel from '../panel/EmptyPanel';
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

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

	return (
		<div className={classes.mainContainer}>
			<Navbar />
			<ErrorBoundary
				fallback={<EmptyPanel text={'An error has occurred'} />}
				onError={(error) => {
					console.error(error);
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
