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
	TableCellLayout,
	TableColumnDefinition,
	createTableColumn,
	makeStyles,
	mergeClasses,
	shorthands,
	tokens
} from '@fluentui/react-components';
import { LocalCommentator } from '@common/interfaces/Data';
import { Add16Regular, DeleteRegular, EditRegular, Person16Regular } from '@fluentui/react-icons';
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
	gridBody: { maxHeight: '400px', overflowY: 'auto' },
	empty: {
		fontStyle: 'italic',
		color: tokens.colorNeutralForeground2,
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		columnSpan: 'all',
		paddingTop: tokens.spacingVerticalXL
	},
	actions: {
		display: 'flex',
		columnGap: tokens.spacingHorizontalS
	},
	button: {
		'& svg': {
			width: '18px',
			height: '18px'
		},
		'&:hover': {
			color: tokens.colorBrandForeground1,
			...shorthands.borderColor(tokens.colorNeutralStroke1)
		}
	},
	delete: {
		'&:hover': {
			color: tokens.colorPaletteRedForeground1
		}
	}
});

const LocalCommentatorTable = () => {
	const ipcRenderer = window.electron.ipcRenderer;
	const classes = useStyles();

	const [data, setData] = useState([]);
	const [open, setOpen] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);

	const getCommentatorsList = async () => {
		const result = await window.api.getCommentators();
		console.log(result);
		setData(result);
		return result;
	};

	useEffect(() => {
		getCommentatorsList();
		ipcRenderer.on('commentator:updated', getCommentatorsList);
		return () => {
			ipcRenderer.removeListener('commentator:updated', getCommentatorsList);
		};
	}, []);

	const handleDelete = async (item: LocalCommentator) => {
		const result = await ipcRenderer.invoke('commentator:remove', item.id);
		console.log(result);
	};

	const columns: TableColumnDefinition<LocalCommentator>[] = [
		createTableColumn({
			columnId: 'name-column',
			renderHeaderCell: () => 'Name / Tag',
			renderCell: (item) => (
				<TableCellLayout media={<Person16Regular />}>{item.name}</TableCellLayout>
			),
			compare: (a, b) => {
				return a.name.localeCompare(b.name);
			}
		}),
		createTableColumn({
			columnId: 'social-column',
			renderHeaderCell: () => 'Social Media Handle',
			renderCell: (item) => item.social && <TableCellLayout>{item.social}</TableCellLayout>
		}),
		createTableColumn({
			columnId: 'actions-column',
			renderHeaderCell: () => 'Actions',
			renderCell: (item) => (
				<div className={classes.actions}>
					<Dialog open={openEdit}>
						<Button
							size="small"
							appearance="outline"
							className={classes.button}
							onClick={() => setOpenEdit(true)}
							icon={<EditRegular />}
						/>
						<CommentatorDialog setOpen={setOpenEdit} data={item} />
					</Dialog>
					<Button
						size="small"
						appearance="outline"
						className={mergeClasses(classes.button, classes.delete)}
						onClick={() => handleDelete(item)}
						icon={<DeleteRegular />}
					/>
				</div>
			)
		})
	];

	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<Body1>Commentator Data</Body1>
				<Dialog open={open}>
					<Button
						appearance="primary"
						size="small"
						icon={<Add16Regular />}
						iconPosition="after"
						onClick={() => setOpen(true)}
					>
						Add Entry
					</Button>
					<CommentatorDialog setOpen={setOpen} />
				</Dialog>
			</div>
			<Card className={classes.card}>
				<DataGrid items={data} columns={columns} sortable>
					<DataGridHeader>
						<DataGridRow>
							{({ renderHeaderCell }) => (
								<DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
							)}
						</DataGridRow>
						{data.length > 0 ? (
							<DataGridBody<LocalCommentator> className={classes.gridBody}>
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
