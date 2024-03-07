import {
	Button,
	Checkbox,
	Tooltip,
	makeStyles,
	shorthands,
	tokens
} from '@fluentui/react-components';
import { Filter16Regular } from '@fluentui/react-icons';
import { useState } from 'react';

const useStyles = makeStyles({
	container: {
		width: '100%',
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	input: {
		width: '100%',
		height: '34px',
		backgroundColor: 'inherit',
		...shorthands.padding('0px', tokens.spacingHorizontalM),
		...shorthands.border('0px'),
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3),
		fontSize: tokens.fontSizeBase200,
		color: tokens.colorNeutralForeground2,
		'&::placeholder': {
			fontStyle: 'italic'
		}
	},
	filterButton: {
		position: 'absolute',
		right: '0'
	},
	filterContainer: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingHorizontalS),
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3)
	},
	checkbox: {
		'& label': {
			fontSize: tokens.fontSizeBase200
		}
	}
});

const MatchSearchBar = () => {
	const classes = useStyles();

	const [searchTerm, setSearchTerm] = useState('');
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<div className={classes.container}>
				<input
					className={classes.input}
					placeholder="Search for a player..."
					type="text"
					value={searchTerm}
					onChange={(ev) => {
						setSearchTerm(ev.target.value);
					}}
				/>
				<Tooltip
					content={'Filter Options'}
					relationship={'label'}
					positioning={'before'}
					showDelay={500}
				>
					<Button
						className={classes.filterButton}
						icon={<Filter16Regular />}
						appearance="transparent"
						onClick={() => {
							setMenuOpen((prev) => !prev);
						}}
					/>
				</Tooltip>
			</div>
			{menuOpen && (
				<div className={classes.filterContainer}>
					<Checkbox className={classes.checkbox} label="Stream" />
					<Checkbox className={classes.checkbox} label="Waiting" />
					<Checkbox className={classes.checkbox} label="In-Progress" />
					<Checkbox className={classes.checkbox} label="Completed" />
				</div>
			)}
		</>
	);
};

export default MatchSearchBar;
