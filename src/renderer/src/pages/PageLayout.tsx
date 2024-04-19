import { ErrorBoundary } from 'react-error-boundary';
import EmptyPanel from '@renderer/components/panel/EmptyPanel';
import { EmojiSad20Regular } from '@fluentui/react-icons';

interface PageLayoutProps {
	header: React.ReactNode;
	children: React.ReactNode;
}

const PageLayout = ({ header, children }: PageLayoutProps) => {
	return (
		<>
			{header}
			<ErrorBoundary
				fallback={<EmptyPanel text="An error has occurred" icon={<EmojiSad20Regular />} />}
				onError={(error) => {
					console.error(error);
				}}
			>
				{children}
			</ErrorBoundary>
		</>
	);
};

export default PageLayout;
