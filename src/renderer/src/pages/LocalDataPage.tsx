import PageHeader from '../pageheader/PageHeader';
import { DatabasePerson20Regular } from '@fluentui/react-icons';
import Panel from '@renderer/components/panel/Panel';
import PageLayout from './PageLayout';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import LocalCommentatorTable from '@renderer/components/tables/LocalCommentatorTable';
import LocalPlayerTable from '@renderer/components/tables/LocalPlayerTable';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		rowGap: tokens.spacingVerticalL,
		...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalXL),
		paddingBottom: tokens.spacingVerticalXL
	}
});

const LocalDataPage = () => {
	const classes = useStyles();
	return (
		<PageLayout header={<PageHeader title="Local Data" icon={<DatabasePerson20Regular />} />}>
			<Panel as="section">
				<div className={classes.container}>
					<LocalPlayerTable />
					<LocalCommentatorTable />
				</div>
			</Panel>
		</PageLayout>
	);
};

export default LocalDataPage;
