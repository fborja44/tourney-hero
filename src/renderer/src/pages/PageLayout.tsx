import { ErrorBoundary } from 'react-error-boundary';
import EmptyPanel from '@renderer/components/panel/EmptyPanel';
import { EmojiSad20Regular } from '@fluentui/react-icons';
import { setOverlayData } from '@renderer/redux/actions/dataActions';
import { initialState } from '@renderer/redux/reducers/dataReducer';
import { useDispatch } from 'react-redux';

interface PageLayoutProps {
	header: React.ReactNode;
	children: React.ReactNode;
}

const PageLayout = ({ header, children }: PageLayoutProps) => {
	const dispatch = useDispatch();

	return (
		<>
			{header}
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
					dispatch(setOverlayData(initialState));
				}}
			>
				{children}
			</ErrorBoundary>
		</>
	);
};

export default PageLayout;
