import { useEffect, useState } from 'react';
import {
	Body1,
	Button,
	Card,
	DataGrid,
	DataGridBody,
	DataGridCell,
	DataGridHeader,
	DataGridHeaderCell,
	DataGridRow,
	Dialog,
	DialogTrigger,
	TableCellLayout,
	TableColumnDefinition,
	createTableColumn,
	makeStyles,
	tokens
} from '@fluentui/react-components';
import { LocalCommentator } from '@common/interfaces/Data';
import {
	Add16Regular,
	Delete20Regular,
	Globe20Regular,
	Person20Regular
} from '@fluentui/react-icons';
import CommentatorDialog from '../dialogs/local/CommentatorDialog';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		rowGap: tokens.spacingVerticalM,
		paddingTop: tokens.spacingVerticalM
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	card: {
		boxShadow: 'none',
		paddingBottom: tokens.spacingVerticalXL
	},
	empty: {
		fontStyle: 'italic',
		color: tokens.colorNeutralForeground2,
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		columnSpan: 'all',
		paddingTop: tokens.spacingVerticalXL
	}
});

const LocalCommentatorTable = () => {
	const ipcRenderer = window.electron.ipcRenderer;
	const classes = useStyles();

	const [data, setData] = useState([]);

	const getCommentatorsList = async () => {
		const result = await window.api.getCommentators();
		console.log(result);
		setData(result);
		return result;
	};

	useEffect(() => {
		getCommentatorsList();
	}, []);

	const handleDelete = async (item: LocalCommentator) => {
		const result = await ipcRenderer.invoke('commentator:remove', item.name);
		console.log(result);
	};

	const columns: TableColumnDefinition<LocalCommentator>[] = [
		createTableColumn({
			columnId: 'name-column',
			renderHeaderCell: () => 'Name / Tag',
			renderCell: (item) => (
				<TableCellLayout media={<Person20Regular />}>{item.name}</TableCellLayout>
			)
		}),
		createTableColumn({
			columnId: 'social-column',
			renderHeaderCell: () => 'Social Media Handle',
			renderCell: (item) => (
				<TableCellLayout media={<Globe20Regular />}>{item.social}</TableCellLayout>
			)
		}),
		createTableColumn({
			columnId: 'actions-column',
			renderHeaderCell: () => 'Actions',
			renderCell: (item) => (
				<Button onClick={() => handleDelete(item)} icon={<Delete20Regular />} />
			)
		})
	];

	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<Body1>Commentator Data</Body1>
				<Dialog>
					<DialogTrigger disableButtonEnhancement>
						<Button
							appearance="primary"
							size="small"
							icon={<Add16Regular />}
							iconPosition="after"
						>
							Add Entry
						</Button>
					</DialogTrigger>
					<CommentatorDialog />
				</Dialog>
			</div>
			<Card className={classes.card}>
				<DataGrid items={data} columns={columns}>
					<DataGridHeader>
						<DataGridRow>
							{({ renderHeaderCell }) => (
								<DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
							)}
						</DataGridRow>
						{data.length > 0 ? (
							<DataGridBody<LocalCommentator>>
								{({ item, rowId }) => (
									<DataGridRow<LocalCommentator> key={rowId}>
										{({ renderCell }) => (
											<DataGridCell>{renderCell(item)}</DataGridCell>
										)}
									</DataGridRow>
								)}
							</DataGridBody>
						) : (
							<div className={classes.empty}>No Items Found</div>
						)}
					</DataGridHeader>
				</DataGrid>
			</Card>
		</div>
	);
};

export default LocalCommentatorTable;
