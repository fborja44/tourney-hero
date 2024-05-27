import { Button, Tooltip, mergeClasses } from '@fluentui/react-components';
import PlayerForm from './PlayerForm';
import { ArrowSwapRegular } from '@fluentui/react-icons';
import formStyles from './styles/FormStyles';
import { PlayerData } from '@common/interfaces/Data';
import { useDispatch } from 'react-redux';

export type PlayerUpdateFunction = (
	targetPlayer: 'player1' | 'player2',
	updatedPlayer: Partial<PlayerData>
) => {
	payload: {
		targetPlayer: 'player1' | 'player2';
		updatedPlayer: Partial<PlayerData>;
	};
	type: 'UPDATE_PLAYER' | 'UPDATE_STATS_PLAYER';
};

interface PlayerFormProps {
	player1: PlayerData;
	player2: PlayerData;
	updateFn: PlayerUpdateFunction;
}

const PlayerFormSection = ({ player1, player2, updateFn }: PlayerFormProps) => {
	const classes = formStyles();
	const dispatch = useDispatch();

	/**
	 * Swaps player form data.
	 */
	const handleSwapPlayers = () => {
		const tempPlayer1 = { ...player1 };
		dispatch(updateFn('player1', player2));
		dispatch(updateFn('player2', tempPlayer1));
	};

	return (
		<div className={mergeClasses(classes.formSectionRow, classes.relative)}>
			<PlayerForm playerNumber="1" playerData={player1} updateFn={updateFn} />
			<PlayerForm playerNumber="2" playerData={player2} updateFn={updateFn} />
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
