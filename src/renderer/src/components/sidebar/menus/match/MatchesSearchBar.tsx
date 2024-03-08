import {
	// Button,
	// Checkbox,
	makeStyles,
	shorthands,
	tokens
	// CheckboxOnChangeData
} from '@fluentui/react-components';
import { Search16Regular } from '@fluentui/react-icons';
// import { Filter16Regular } from '@fluentui/react-icons';
// import { useState } from 'react';

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
		paddingLeft: '30px',
		...shorthands.border('0px'),
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3),
		fontSize: tokens.fontSizeBase200,
		color: tokens.colorNeutralForeground2,
		'&::placeholder': {
			fontStyle: 'italic'
		}
	},
	searchIcon: {
		position: 'absolute',
		left: tokens.spacingHorizontalS,
		color: tokens.colorNeutralForeground2
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

interface MatchesSearchBarProps {
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const MatchesSearchBar = ({ searchTerm, setSearchTerm }: MatchesSearchBarProps) => {
	const classes = useStyles();

	// const [menuOpen, setMenuOpen] = useState(false);

	// const onFilterChanged = (
	// 	ev: React.ChangeEvent<HTMLInputElement>,
	// 	data: CheckboxOnChangeData
	// ) => {
	// 	const value = parseInt(ev.target.value);
	// 	if (data.checked) {
	// 		setStateFilters((prevFilters) => [...prevFilters, value]);
	// 	} else {
	// 		setStateFilters((prevFilters) => prevFilters.filter((filter) => filter !== value));
	// 	}
	// };

	return (
		<>
			<div className={classes.container}>
				<Search16Regular className={classes.searchIcon} />
				<input
					className={classes.input}
					placeholder="Search for a player..."
					type="text"
					value={searchTerm}
					onChange={(ev) => {
						setSearchTerm(ev.target.value);
					}}
					spellCheck={false}
				/>
				{/* <Button
					className={classes.filterButton}
					icon={<Filter16Regular />}
					appearance="transparent"
					onClick={() => {
						setMenuOpen((prev) => !prev);
					}}
				/> */}
			</div>
			{/* {menuOpen && (
				<div className={classes.filterContainer}>
					<Checkbox
						className={classes.checkbox}
						checked={stateFilters.includes(1)}
						value={1}
						label="Waiting"
						onChange={onFilterChanged}
					/>
					<Checkbox
						className={classes.checkbox}
						checked={stateFilters.includes(2)}
						value={2}
						label="In-Progress"
						onChange={onFilterChanged}
					/>
					<Checkbox
						className={classes.checkbox}
						checked={stateFilters.includes(3)}
						value={3}
						label="Completed"
						onChange={onFilterChanged}
					/>
				</div>
			)} */}
		</>
	);
};

export default MatchesSearchBar;
