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
	mergeClasses,
	shorthands,
	tokens,
	useToastController
} from '@fluentui/react-components';
import { LocalPlayer } from '@common/interfaces/Data';
import { Add16Regular, DeleteRegular, EditRegular, Person16Regular } from '@fluentui/react-icons';
import CharacterIcon from '../character/CharacterIcon';
import PlayerDialog from '../dialogs/local/PlayerDialog';
import MessageToast from '../toasts/MessageToast';

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
			...shorthands.borderColor(tokens.colorNeutralStroke1)
		}
	},
	characterContainer: {
		display: 'flex',
		'& img': {
			position: 'relative',
			top: '2px'
		}
	},
	delete: {
		'&:hover': {
			color: tokens.colorPaletteRedForeground1
		}
	}
});

const LocalPlayerTable = () => {
	const ipcRenderer = window.electron.ipcRenderer;
	const classes = useStyles();

	const { dispatchToast } = useToastController('toaster');

	const [data, setData] = useState([]);
	const [open, setOpen] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);

	const getPlayersList = async () => {
		const result = await window.api.getPlayers();
		setData(result);
		return result;
	};

	useEffect(() => {
		getPlayersList();
		ipcRenderer.on('player:updated', getPlayersList);
		return () => {
			ipcRenderer.removeListener('player:updated', getPlayersList);
		};
	}, []);

	const handleDelete = async (item: LocalPlayer) => {
		const result = await ipcRenderer.invoke('player:remove', item.id);
		if (result.error) {
			dispatchToast(<MessageToast title="Error" message={result.error} />, {
				intent: 'error'
			});
		}
	};

	const columns: TableColumnDefinition<LocalPlayer>[] = [
		createTableColumn({
			columnId: 'tag-column',
			renderHeaderCell: () => 'Tag',
			renderCell: (item) => (
				<TableCellLayout media={<Person16Regular />}>{item.tag}</TableCellLayout>
			),
			compare: (a, b) => {
				return a.tag.localeCompare(b.tag);
			}
		}),
		createTableColumn({
			columnId: 'character-column',
			renderHeaderCell: () => 'Character',
			renderCell: (item) =>
				item.characterId !== null &&
				item.characterId !== undefined && (
					<TableCellLayout className={classes.characterContainer}>
						<CharacterIcon size={20} characterId={item.characterId} />
					</TableCellLayout>
				)
		}),
		createTableColumn({
			columnId: 'team-column',
			renderHeaderCell: () => 'Team',
			renderCell: (item) =>
				item.team !== null && <TableCellLayout>{item.team}</TableCellLayout>
		}),
		createTableColumn({
			columnId: 'pronouns-column',
			renderHeaderCell: () => 'Pronoun(s)',
			renderCell: (item) => item.pronoun && <TableCellLayout>{item.pronoun}</TableCellLayout>
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
						<PlayerDialog setOpen={setOpenEdit} data={item} />
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
				<Body1>Player Data</Body1>
				<Dialog open={open}>
					<DialogTrigger disableButtonEnhancement>
						<Button
							appearance="primary"
							size="small"
							icon={<Add16Regular />}
							iconPosition="after"
							onClick={() => setOpen(true)}
						>
							Add Entry
						</Button>
					</DialogTrigger>
					<PlayerDialog setOpen={setOpen} />
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
							<DataGridBody<LocalPlayer> className={classes.gridBody}>
								{({ item, rowId }) => (
									<DataGridRow<LocalPlayer> key={rowId}>
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

export default LocalPlayerTable;
