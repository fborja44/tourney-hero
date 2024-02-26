import PageHeader from '../pageheader/PageHeader';
import { DatabasePerson20Regular } from '@fluentui/react-icons';
import Panel from '@renderer/components/panel/Panel';
import PageLayout from './PageLayout';
import { useEffect } from 'react';

const LocalDataPage = () => {
	const getCommentatorsList = async () => {
		const data = await window.api.getCommentators();
		console.log(data);
	};

	useEffect(() => {
		getCommentatorsList();
	}, []);

	return (
		<PageLayout header={<PageHeader title="Local Data" icon={<DatabasePerson20Regular />} />}>
			<Panel></Panel>
		</PageLayout>
	);
};

export default LocalDataPage;
