import MenuTextField from '@renderer/components/form/inputs/MenuTextField';
import ActionMenu, { ActionMenuSection } from '../ActionMenu';
import ActionMenuStyles from '../styles/ActionMenuStyles';
import { useState } from 'react';

const AutomationMenu = () => {
	const classes = ActionMenuStyles();

	// TODO: Add Lucky Stats API Hook
	const {
		error: keyError,
		setError: setKeyError,
		loading: keyLoading,
		fetchData: keyFetch
	} = useLuckyStats();

	const [keyValue, setKeyValue] = useState(''); // TODO: Add to state, import from env

	// TODO: Lucky Stats Status in state
	const keyValidation =
		luckyStatsState.validated && luckyStatsState.key === keyValue
			? 'success'
			: keyError
				? 'error'
				: 'none';
	const keyMessage = keyValidation === 'success' ? 'Key Validated' : keyError ?? '';

	return (
		<ActionMenu title="Lucky Stats Configuration">
			<ActionMenuSection label="API Integration">
				<MenuTextField
					label="Session Key"
					value={keyValue}
					placeholder="Enter your start.gg API key"
					size="small"
					type="password"
					handleChange={(_ev, data) => {
						setKeyError(null);
						setKeyValue(data.value);
					}}
					validationState={keyValidation}
					validationMessage={keyMessage}
					disabled={luckyStatsState.validated}
				/>
			</ActionMenuSection>
		</ActionMenu>
	);
};

export default AutomationMenu;
