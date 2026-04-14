import ActionMenu, { ActionMenuSection } from '../ActionMenu';
import ActionMenuStyles from '../styles/ActionMenuStyles';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { LuckyStatsState } from '@renderer/redux/reducers/luckyStatsReducer';
import { Button, Switch } from '@fluentui/react-components';
import { setLuckyStatsIsEnabled } from '@renderer/redux/actions/luckyStatsActions';
import { updateGameplay } from '@renderer/redux/actions/dataActions';
import useLuckyStats from '@renderer/hooks/luckystats/useLuckyStats';

const AutomationMenu = () => {
	const classes = ActionMenuStyles();
	const dispatch = useDispatch();

	const { setMatchupData } = useLuckyStats();
	// const { sendSocketData } = useSocket();

	const { isEnabled }: LuckyStatsState = useSelector((state: AppState) => state.luckyStatsState);
	const { player1, player2 } = useSelector((state: AppState) => state.dataState.gameplay);

	/**
	 * Fetch and set matchup data.
	 */
	const handleRefreshMatchupData = async () => {
		await setMatchupData(player1?.startggId, player2?.startggId);
	};

	/**
	 * Clears matchup data.
	 */
	const handleClearMatchupData = () => {
		dispatch(
			updateGameplay({
				matchup: null
			})
		);
	};

	return (
		<ActionMenu title="Lucky Stats Configuration">
			<ActionMenuSection label="API Integration">
				<Switch
					className={classes.switch}
					label="Enable Lucky Stat Integration"
					checked={isEnabled}
					onChange={(_ev, data) => {
						dispatch(setLuckyStatsIsEnabled(data.checked));
					}}
				/>
			</ActionMenuSection>
			<ActionMenuSection label="Matchup Data">
				<div className={classes.buttonsContainer}>
					<Button
						size="small"
						appearance="secondary"
						onClick={handleRefreshMatchupData}
						iconPosition="after"
					>
						Refresh H2H
					</Button>
					<Button
						size="small"
						appearance="secondary"
						onClick={handleClearMatchupData}
						iconPosition="after"
					>
						Clear H2H
					</Button>
				</div>
			</ActionMenuSection>
		</ActionMenu>
	);
};

export default AutomationMenu;
