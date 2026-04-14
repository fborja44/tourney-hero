import { useEffect, useState } from 'react';

import MenuTextField from '../../form/inputs/MenuTextField';
import { Button } from '@fluentui/react-components';
import { useDispatch, useSelector } from 'react-redux';
import { TournamentState } from '@redux/reducers/tournamentReducer';
import {
	setEventSlug,
	setKey,
	setMatches,
	setSelectedEvent,
	setTop8Matches,
	setTournamentFields
} from '@redux/actions/tournamentActions';
import tournamentQuery from '@graphql/queries/tournamentQuery';
import { Tournament, TournamentEvent } from '@common/interfaces/Types';
import { updateGameplay } from '@redux/actions/dataActions';
import { getEventSlug } from '@utils/string';
import MenuSelectField from '../../form/inputs/MenuSelectField';
import { AppState } from '@renderer/redux/reducers/rootReducer';
import useStartQuery from '@hooks/startgg/useStartQuery';
import ActionMenu from '../ActionMenu';
import ActionMenuStyles from '../styles/ActionMenuStyles';

const TournamentMenu = () => {
	const classes = ActionMenuStyles();
	const dispatch = useDispatch();

	const {
		error: keyError,
		setError: setKeyError,
		loading: keyLoading,
		fetchData: keyFetch
	} = useStartQuery();

	const {
		error: tournamentError,
		setError: setTournamentError,
		loading: tournamentLoading,
		fetchData: tournamentFetch
	} = useStartQuery();

	const tournamentState: TournamentState = useSelector(
		(state: AppState) => state.tournamentState
	);
	const [keyValue, setKeyValue] = useState(
		tournamentState.key || import.meta.env.VITE_START_GG_KEY || ''
	);
	const [tournamentSlugValue, setTournamentSlugValue] = useState(
		tournamentState.tournamentSlug || 'full-house-siege'
	);

	/**
	 * Saves the key in the menu and in state.
	 */
	const handleSaveKey = async () => {
		setKeyError(null);
		// If empty, clear
		if (!keyValue) {
			return handleClearKey();
		}
		// Send test query
		const data = await keyFetch(keyValue, tournamentQuery('full-house-2023'));
		if (data) {
			dispatch(setKey(keyValue, true));
		} else {
			setKeyError('Invalid key');
		}
	};

	useEffect(() => {
		// TODO: Refactor
		if (!tournamentState.key && import.meta.env.VITE_START_GG_KEY) {
			handleSaveKey();
		}
	}, []);

	/**
	 * Clears the key input and in state.
	 */
	const handleClearKey = () => {
		setKeyValue('');
		setKeyError(null);
		dispatch(setKey('', false));
		// Clear fields too
		handleClearFields();
	};

	/**
	 * Saves all tournament menu fields.
	 */
	const handleSaveTournament = async () => {
		setTournamentError(null);
		if (!tournamentSlugValue.trim()) {
			setTournamentError('This field is required');
		}
		if (!tournamentSlugValue) {
			return;
		}
		// Send tournament test query
		const tournamentData = await tournamentFetch(
			keyValue,
			tournamentQuery(tournamentSlugValue)
		);
		if (!tournamentData || !tournamentData.data?.tournament) {
			setTournamentError('Failed to get tournament');
			return;
		}

		// Get Tournament events
		const events: TournamentEvent[] = tournamentData?.data?.tournament?.events?.map(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(event: any) => {
				return {
					id: event.id,
					name: event.name,
					slug: getEventSlug(event.slug),
					phases: event.phases?.map((phase) => phase.name) ?? []
				};
			}
		);

		const tournament: Tournament = {
			id: tournamentData.data?.tournament?.id,
			name: tournamentData.data?.tournament?.name,
			events: events,
			imageUrl: tournamentData?.data?.tournament?.images?.[0]?.url ?? ''
		};

		handleEventChange(events.length > 0 ? events[0] : undefined);

		dispatch(setTournamentFields(tournamentSlugValue, tournament));
		dispatch(
			updateGameplay({
				infoMsg: `start.gg/${tournamentSlugValue}`
			})
		);
	};

	const handleEventChange = (event: TournamentEvent | undefined) => {
		if (!event) return;
		dispatch(setEventSlug(event.slug));
		dispatch(setSelectedEvent(event));
		dispatch(updateGameplay({ eventName: event.name }));
	};

	/**
	 * Clears all menu fields.
	 */
	const handleClearFields = () => {
		setTournamentSlugValue('');
		setTournamentError(null);
		dispatch(setEventSlug(''));
		dispatch(setSelectedEvent(undefined));
		dispatch(setTournamentFields('', undefined));
		dispatch(setMatches([]));
		dispatch(setTop8Matches([]));
	};

	const fieldsLoading = tournamentLoading;

	// Validation
	const keyValidation =
		tournamentState.validated && tournamentState.key === keyValue
			? 'success'
			: keyError
				? 'error'
				: 'none';
	const keyMessage = keyValidation === 'success' ? 'Key Validated' : keyError ?? '';

	const tournamentValidation =
		tournamentState.tournament && tournamentState.tournamentSlug === tournamentSlugValue
			? 'success'
			: tournamentError
				? 'error'
				: 'none';
	const tournamentMessage =
		keyValidation === 'success' && tournamentState.tournament
			? tournamentState.tournament.name
			: tournamentError ?? '';

	return (
		<>
			<ActionMenu title="Start.gg Configuration">
				<MenuTextField
					label="API Key"
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
					disabled={tournamentState.validated}
				/>
				<div className={classes.buttonsContainer}>
					{!tournamentState.validated && (
						<Button
							size="small"
							appearance="primary"
							onClick={handleSaveKey}
							iconPosition="after"
							disabled={keyLoading}
						>
							{keyLoading ? 'Validating...' : 'Test API Key'}
						</Button>
					)}
					<Button size="small" onClick={handleClearKey} iconPosition="after">
						Clear API Key
					</Button>
				</div>
			</ActionMenu>
			{tournamentState.validated && (
				<ActionMenu title="Tournament Information">
					<MenuTextField
						label="Tournament Slug"
						value={tournamentSlugValue}
						placeholder="ex. full-house-2024"
						size="small"
						handleChange={(_ev, data) => {
							setTournamentError(null);
							setTournamentSlugValue(data.value);
						}}
						validationState={tournamentValidation}
						validationMessage={tournamentMessage}
						required={true}
						disabled={fieldsLoading || tournamentValidation === 'success'}
					/>
					<div className={classes.buttonsContainer}>
						{!(fieldsLoading || tournamentValidation === 'success') && (
							<Button
								size="small"
								appearance="primary"
								onClick={handleSaveTournament}
								iconPosition="after"
							>
								{fieldsLoading ? 'Validating...' : 'Save Tournament'}
							</Button>
						)}
						<Button size="small" onClick={handleClearFields} iconPosition="after">
							Clear Tournament
						</Button>
					</div>
				</ActionMenu>
			)}
			{tournamentState.tournament && (
				<ActionMenu title="Tournament Event Selection">
					<MenuSelectField
						label="Event Slug"
						value={tournamentState.eventSlug}
						size="small"
						handleChange={(_ev, data) => {
							const event =
								tournamentState.tournament?.events.filter(
									(event) => event.slug === data.value
								)[0] ?? undefined;
							handleEventChange(event);
						}}
						disabled={fieldsLoading}
						options={tournamentState.tournament.events.map((event) => event.slug) ?? []}
					/>
				</ActionMenu>
			)}
		</>
	);
};

export default TournamentMenu;
