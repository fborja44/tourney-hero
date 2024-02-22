import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { Character } from '../../interfaces/Types';

const useStyles = makeStyles({
	characterIcon: {
		width: '18px',
		height: '18px',
	},
});

interface CharacterProps {
	character: Character;
	className?: string;
}

const CharacterIcon = ({ character, className }: CharacterProps) => {
	const classes = useStyles();
	return (
		character !== 'Default' && (
			<img
				className={mergeClasses(classes.characterIcon, className)}
				alt=''
				src={`/assets/stockicons/${encodeURIComponent(character)}.png`}
			/>
		)
	);
};

export default CharacterIcon;
