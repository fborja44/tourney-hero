import { Button, Tooltip, mergeClasses } from '@fluentui/react-components';
import PlayerForm from './PlayerForm';
import { ArrowSwapRegular } from '@fluentui/react-icons';
import formStyles from './styles/FormStyles';
import { PlayerData } from '@common/interfaces/Data';
import useOverlayControls from '@hooks/controls/useOverlayControls';

interface PlayerFormProps {
	player1: PlayerData;
	player2: PlayerData;
}

const PlayerFormSection = ({ player1, player2 }: PlayerFormProps) => {
	const classes = formStyles();

	const { handlePlayerChange } = useOverlayControls();

	/**
	 * Swaps player form data.
	 */
	const handleSwapPlayers = () => {
		const tempPlayer1 = { ...player1 };
		handlePlayerChange('player1', player2);
		handlePlayerChange('player2', tempPlayer1);
	};

	return (
		<div className={mergeClasses(classes.formSectionRow, classes.relative)}>
			<PlayerForm playerNumber="1" playerData={player1} />
			<PlayerForm playerNumber="2" playerData={player2} />
			<Tooltip content={'Swap Players'} relationship={'label'}>
				<Button
					icon={<ArrowSwapRegular />}
					className={classes.swapButton}
					appearance="secondary"
					onClick={handleSwapPlayers}
				/>
			</Tooltip>
		</div>
	);
};

export default PlayerFormSection;
