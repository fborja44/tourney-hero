import { useContext, useState } from 'react';
import {
	Button,
	Menu,
	MenuItem,
	MenuList,
	MenuPopover,
	MenuTrigger,
	makeStyles,
	shorthands
} from '@fluentui/react-components';
import { MoreVertical20Regular, ArrowReset20Regular, Copy20Regular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import SendDataButton from './buttons/SendDataButton';
import { useDispatch, useSelector } from 'react-redux';
import { SocketClientContext } from '@renderer/socket/SocketClientProvider';
import PageHeader from './PageHeader';
import { SceneData, OverlayData } from '@common/interfaces/Data';
import {
	updateBracket,
	updateCommentators,
	updateGameplay,
	updatePlayerCard
} from '@renderer/redux/actions/dataActions';
import { initialState } from '@renderer/redux/reducers/dataReducer';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import ActiveIndicator from '@renderer/components/pulse/ActiveIndicator';
import SwitchSceneButton from './buttons/SwitchSceneButton';
import { ActionCreatorWithPreparedPayload } from '@reduxjs/toolkit';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Scene } from '@common/interfaces/Types';

const useStyles = makeStyles({
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row'
	},
	button: {
		...shorthands.margin(0, 0, 0, tokens.spacingHorizontalM)
	},
	popover: {
		minWidth: '175px'
	}
});

interface SceneHeaderProps {
	scene: Scene;
	dataField: keyof OverlayData;
	sendData?: () => void;
}

const SceneHeader = ({ scene, dataField, sendData }: SceneHeaderProps) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { connected, address } = useContext(SocketClientContext);
	const { currentScene } = useSelector((state: AppState) => state.obsState);

	const [copied, setCopied] = useState(false);

	let updateDataState: ActionCreatorWithPreparedPayload<
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any,
		Partial<SceneData>,
		string,
		never,
		never
	> | null = null;
	const defaultData = initialState[dataField];
	switch (dataField) {
		case 'gameplay':
			updateDataState = updateGameplay;
			break;
		case 'bracket':
			updateDataState = updateBracket;
			break;
		case 'commentators':
			updateDataState = updateCommentators;
			break;
		case 'playerCard':
			updateDataState = updatePlayerCard;
			break;
		default:
			break;
	}

	const active = currentScene === scene.title;

	return (
		<PageHeader title={`${scene.title} Control Panel`} icon={scene.icon}>
			<div className={classes.buttonContainer}>
				{active && <ActiveIndicator />}
				<SwitchSceneButton sceneName={scene.title} className={classes.button} />
				{sendData && (
					<SendDataButton
						className={classes.button}
						sendData={sendData}
						disabled={!connected}
					/>
				)}
				<Menu>
					<MenuTrigger>
						<Button
							icon={<MoreVertical20Regular />}
							className={classes.button}
							size="small"
						/>
					</MenuTrigger>
					<MenuPopover className={classes.popover}>
						<MenuList>
							<CopyToClipboard
								text={address + scene.source}
								onCopy={() => {
									setCopied(true);
									// Delay changing state back to false after 2 seconds
									setTimeout(() => {
										setCopied(false);
									}, 3000);
								}}
							>
								<MenuItem icon={<Copy20Regular />} persistOnClick>
									{copied ? 'Copied!' : 'Copy Source URL'}
								</MenuItem>
							</CopyToClipboard>
							<MenuItem
								icon={<ArrowReset20Regular />}
								onClick={() => {
									if (updateDataState) {
										dispatch(updateDataState(defaultData));
									}
								}}
							>
								Reset Data
							</MenuItem>
						</MenuList>
					</MenuPopover>
				</Menu>
			</div>
		</PageHeader>
	);
};

export default SceneHeader;
