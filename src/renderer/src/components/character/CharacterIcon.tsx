import { JoiCharacter } from '@common/validator/JoiGameplay';
import { makeStyles, mergeClasses } from '@fluentui/react-components';

const useStyles = makeStyles({
	characterIcon: {
		width: '18px',
		height: '18px'
	}
});

interface CharacterProps {
	characterId: number | string | undefined;
	className?: string;
	size?: number;
}

const CharacterIcon = ({ characterId, className, size }: CharacterProps) => {
	const classes = useStyles();

	if (typeof characterId === 'string') {
		characterId = parseInt(characterId);
	}

	if (!JoiCharacter.validate(characterId) || characterId === undefined || characterId === null) {
		return null;
	}

	if (characterId === null || characterId === undefined || characterId < 0) return null;

	return (
		<img
			style={{ width: size, height: size }}
			className={mergeClasses(classes.characterIcon, className)}
			alt=""
			src={`/assets/stockicons/${encodeURIComponent(characterId)}/0/stock.png`}
		/>
	);
};

CharacterIcon.defaultProps = {
	size: 18
};

export default CharacterIcon;
