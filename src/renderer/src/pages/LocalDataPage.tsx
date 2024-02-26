import PageHeader from '../pageheader/PageHeader';
import { DatabasePerson20Regular } from '@fluentui/react-icons';
import Panel from '@renderer/components/panel/Panel';
import PageLayout from './PageLayout';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import LocalCommentatorTable from '@renderer/components/tables/LocalCommentatorTable';

const useStyles = makeStyles({
	container: {
		...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalXL)
	}
});

const LocalDataPage = () => {
	const classes = useStyles();
	return (
		<PageLayout header={<PageHeader title="Local Data" icon={<DatabasePerson20Regular />} />}>
			<Panel>
				<div className={classes.container}>
					<LocalCommentatorTable />
				</div>
			</Panel>
		</PageLayout>
	);
};

export default LocalDataPage;
