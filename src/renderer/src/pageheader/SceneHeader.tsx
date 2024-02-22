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
import { MoreVertical20Regular, ArrowReset20Regular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import SendDataButton from './buttons/SendDataButton';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { SocketClientContext } from '@renderer/socket/SocketClientProvider';
import PageHeader, { PageHeaderProps } from './PageHeader';
import { Data, OverlayData } from '@renderer/interfaces/Data';
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

const useStyles = makeStyles({
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row'
	},
	button: {
		...shorthands.margin(0, 0, 0, tokens.spacingHorizontalM)
	}
});

interface SceneHeaderProps extends PageHeaderProps {
	title: string;
	icon?: React.ReactNode | JSX.Element;
	dataField: keyof OverlayData;
	sendData?: () => void;
}

const SceneHeader = ({ title, icon, dataField, sendData }: SceneHeaderProps) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { connected } = useContext(SocketClientContext);

	const { currentScene } = useSelector((state: AppState) => state.obsState);

	let updateDataState: ActionCreatorWithPreparedPayload<
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		any,
		Partial<Data>,
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

	const active = currentScene === title;

	return (
		<PageHeader title={`${title} Control Panel`} icon={icon}>
			<div className={classes.buttonContainer}>
				{active && <ActiveIndicator />}
				<SwitchSceneButton sceneName={title} className={classes.button} />
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
					<MenuPopover>
						<MenuList>
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
