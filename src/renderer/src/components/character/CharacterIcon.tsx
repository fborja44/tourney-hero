import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { Character } from '@common/interfaces/Types';

const useStyles = makeStyles({
	characterIcon: {
		width: '18px',
		height: '18px'
	}
});

interface CharacterProps {
	character: Character;
	className?: string;
	size?: number;
}

const CharacterIcon = ({ character, className, size }: CharacterProps) => {
	const classes = useStyles();
	return (
		character !== 'Default' && (
			<img
				style={{ width: size, height: size }}
				className={mergeClasses(classes.characterIcon, className)}
				alt=""
				src={`/assets/stockicons/${encodeURIComponent(character)}.png`}
			/>
		)
	);
};

CharacterIcon.defaultProps = {
	size: 18
};

export default CharacterIcon;
