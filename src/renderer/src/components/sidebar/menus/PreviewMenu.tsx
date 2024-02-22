import {
	Button,
	Caption1,
	makeStyles,
	shorthands,
} from '@fluentui/react-components';
import {
	VideoProhibited28Regular,
	ArrowSort16Regular,
	PlugDisconnected20Regular,
} from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import Empty from '../SidebarPlaceholder';
import { useContext } from 'react';
import { OBSWebSocketClientContext } from '../../../obs-websocket/OBSWebsocketProvider';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	previewContainer: {
		textAlign: 'center',
		...shorthands.margin(tokens.spacingVerticalM, 0),
	},
	preview: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '120px',
		width: '214px',
		backgroundColor: tokens.colorNeutralBackground2Selected,
		color: tokens.colorNeutralForegroundDisabled,
		...shorthands.borderRadius(tokens.borderRadiusLarge),
		...shorthands.margin(tokens.spacingVerticalS, 0, 0, 0),
	},
	button: {
		width: '214px',
		maxWidth: '214px',
		color: tokens.colorNeutralForeground2,
		...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
		...shorthands.margin(tokens.spacingVerticalS, 0, 0, 0),
	},
});

const Preview = ({ title }: { title: string }) => {
	const classes = useStyles();
	return (
		<div className={classes.previewContainer}>
			<Caption1>{title}</Caption1>
			<span className={classes.preview}>
				<VideoProhibited28Regular />
			</span>
		</div>
	);
};

const PreviewMenu = () => {
	const classes = useStyles();

	const { connected } = useContext(OBSWebSocketClientContext);

	return connected ? (
		<div className={classes.container}>
			<Preview title='Active Scene' />
			<Button
				className={classes.button}
				icon={<ArrowSort16Regular />}
				size='small'
				appearance='outline'
			/>
			<Preview title='Preview Scene' />
		</div>
	) : (
		<Empty
			caption={'OBS Websocket Not Configured'}
			icon={<PlugDisconnected20Regular />}
		/>
	);
};

export default PreviewMenu;
