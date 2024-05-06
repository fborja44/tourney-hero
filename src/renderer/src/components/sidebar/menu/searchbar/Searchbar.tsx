import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Search16Regular } from '@fluentui/react-icons';

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
	}
});

export interface SearchbarProps {
	searchTerm?: string;
	setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar = ({ searchTerm, setSearchTerm }: SearchbarProps) => {
	const classes = useStyles();

	if (searchTerm === undefined || setSearchTerm === undefined) {
		return null;
	}

	return (
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
		</div>
	);
};

export default Searchbar;
