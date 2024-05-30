import {
	Button,
	Dialog,
	DialogActions,
	DialogBody,
	DialogContent,
	DialogSurface,
	DialogTitle,
	DialogTrigger,
	Subtitle2,
	makeStyles,
	tokens
} from '@fluentui/react-components';
import { Add12Regular, SlideAdd16Regular } from '@fluentui/react-icons';
import MenuTextField from '@renderer/components/form/inputs/MenuTextField';
import { OBSWebSocketClientContext } from '@renderer/obs-websocket/OBSWebsocketProvider';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
	surface: {
		width: '400px'
	},
	content: {
		paddingBottom: tokens.spacingVerticalM
	}
});

const CreateSceneCollectionDialog = () => {
	const classes = useStyles();

	const { obs, createOBSSceneCollection } = useContext(OBSWebSocketClientContext);

	const { sceneCollectionList } = useSelector((state: AppState) => state.obsState);

	const [collectionName, setCollectionName] = useState('');

	const error = sceneCollectionList.includes(collectionName);

	return (
		<Dialog>
			<DialogTrigger disableButtonEnhancement>
				<Button
					size="small"
					appearance="primary"
					icon={<SlideAdd16Regular />}
					iconPosition="after"
				>
					Create Scene Collection
				</Button>
			</DialogTrigger>
			<DialogSurface className={classes.surface}>
				<DialogBody>
					<DialogTitle>
						<Subtitle2>Create Scene Collection</Subtitle2>
					</DialogTitle>
					<DialogContent className={classes.content}>
						<MenuTextField
							label="Collection Name"
							value={collectionName}
							handleChange={(_ev, data) => {
								setCollectionName(data.value);
							}}
							placeholder="Enter a collection name"
							validationState={error ? 'error' : 'none'}
							validationMessage={error ? 'Scene Collection already exists' : ''}
						/>
					</DialogContent>
					<DialogActions>
						<DialogTrigger>
							<Button size="small">Close</Button>
						</DialogTrigger>
						<DialogTrigger>
							<Button
								size="small"
								appearance="primary"
								onClick={() => {
									if (obs && createOBSSceneCollection) {
										createOBSSceneCollection(collectionName);
									}
								}}
								icon={<Add12Regular />}
								iconPosition="after"
								disabled={!collectionName.trim() || error}
							>
								Create
							</Button>
						</DialogTrigger>
					</DialogActions>
				</DialogBody>
			</DialogSurface>
		</Dialog>
	);
};

export default CreateSceneCollectionDialog;
