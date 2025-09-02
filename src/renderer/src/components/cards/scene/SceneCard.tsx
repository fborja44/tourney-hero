import { Caption1, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { SceneData } from '@common/interfaces/Types';
import Card from '../../card/Card';
import cardStyles from '../../card/styles/CardStyles';
import { useSelector } from 'react-redux';
import { AppState } from '@redux/reducers/rootReducer';
import ActiveIndicator from '../../pulse/ActiveIndicator';
import SwitchSceneButton from '@renderer/pageheader/buttons/SwitchSceneButton';
import { findScene } from '@utils/obs';
import { Warning16Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
	title: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		...shorthands.gap(tokens.spacingHorizontalS)
	},
	inactive: {
		color: tokens.colorNeutralForeground2,
		textTransform: 'uppercase'
	},
	unavailable: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		color: tokens.colorStatusWarningForeground1,
		textTransform: 'uppercase',
		columnGap: tokens.spacingHorizontalXS
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		...shorthands.margin(tokens.spacingVerticalS, 0, tokens.spacingVerticalM, 0)
	}
});

interface SceneCardProps {
	sceneData: SceneData;
}

const SceneCard = ({ sceneData }: SceneCardProps) => {
	const classes = useStyles();
	const cardClasses = cardStyles();

	const { currentScene, sceneList } = useSelector((state: AppState) => state.obsState);

	const active = currentScene === sceneData.title;

	const sceneExists = findScene(sceneList, sceneData.title) !== undefined;

	return (
		<Card>
			<div className={cardClasses.cardTitle}>
				<div className={classes.title}>
					{sceneData.icon}
					<span>{sceneData.title}</span>
				</div>
				{sceneExists ? (
					active ? (
						<ActiveIndicator />
					) : (
						<Caption1 className={classes.inactive}>Inactive</Caption1>
					)
				) : (
					<Caption1 className={classes.unavailable}>
						<span>Unavailable</span> <Warning16Regular />
					</Caption1>
				)}
			</div>
			<div className={classes.buttonContainer}>
				<SwitchSceneButton sceneData={sceneData} />
			</div>
		</Card>
	);
};

export default SceneCard;
