import MenuTextField from '@renderer/components/form/inputs/MenuTextField';
import ActionMenu, { ActionMenuSection } from '../ActionMenu';
import ActionMenuStyles from '../styles/ActionMenuStyles';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLuckyStats from '@renderer/hooks/luckystats/useLuckyStats';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import { LuckyStatsState } from '@renderer/redux/reducers/luckyStatsReducer';
import { Button } from '@fluentui/react-components';
import { setLuckyStatsKey } from '@renderer/redux/actions/luckyStatsActions';

const AutomationMenu = () => {
	const classes = ActionMenuStyles();
	const dispatch = useDispatch();

	const { error, setError, loading, fetchData } = useLuckyStats();

	const { key }: LuckyStatsState = useSelector((state: AppState) => state.luckyStatsState);

	const [keyValue, setKeyValue] = useState<string>(key ?? '');

	/**
	 * Validate the key by sending a test request.
	 * If successful, store the key in the redux state.
	 */
	const handleValidateKey = async () => {
		if (!keyValue || keyValue.trim() === '') {
			return;
		}
		setError(null);
		const response = await fetchData(keyValue.trim());
		if (response?.status === 200) {
			// TODO: Validate response for required fields
			dispatch(setLuckyStatsKey(keyValue.trim()));
		}
	};

	/**
	 * Clears the key from state.
	 */
	const handleClearKey = () => {
		setError(null);
		setKeyValue('');
		dispatch(setLuckyStatsKey(null));
	};

	const isEditing = key !== keyValue;
	const keyValidation = key && !isEditing ? 'success' : error ? 'error' : 'none';
	const keyMessage = keyValidation === 'success' ? 'Key Validated' : error ?? '';

	return (
		<ActionMenu title="Lucky Stats Configuration">
			<ActionMenuSection label="API Integration">
				<MenuTextField
					label="Session Key"
					value={keyValue}
					placeholder="Enter your session key..."
					size="small"
					type="password"
					handleChange={(_ev, data) => {
						setError(null);
						setKeyValue(data.value);
					}}
					validationState={keyValidation}
					validationMessage={keyMessage}
				/>
			</ActionMenuSection>
			<div className={classes.buttonsContainer}>
				{(!key || isEditing) && (
					<Button
						size="small"
						appearance="primary"
						onClick={handleValidateKey}
						iconPosition="after"
						disabled={loading}
					>
						{loading ? 'Validating...' : 'Test Key'}
					</Button>
				)}
				<Button size="small" onClick={handleClearKey} iconPosition="after">
					Clear Key
				</Button>
			</div>
		</ActionMenu>
	);
};

export default AutomationMenu;
