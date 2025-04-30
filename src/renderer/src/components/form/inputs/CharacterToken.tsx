import { CharacterId } from '@common/interfaces/Types';
import { Button, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Dismiss16Regular } from '@fluentui/react-icons';
import CharacterIcon from '@renderer/components/character/CharacterIcon';

interface CharacterTokenProps {
	characterId: CharacterId;
	index: number;
	handleRemove: (index: number) => void;
}

const useStyles = makeStyles({
	token: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: tokens.spacingHorizontalXS,
		backgroundColor: tokens.colorBrandBackground,
		...shorthands.borderRadius(tokens.borderRadiusCircular),
		...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingHorizontalS)
	}
});

const CharacterToken = ({ characterId, index, handleRemove }: CharacterTokenProps) => {
	const classes = useStyles();

	if (!characterId) return null;

	return (
		<div className={classes.token}>
			<CharacterIcon characterId={characterId} size={20} />
			<Button
				icon={<Dismiss16Regular />}
				size="small"
				appearance="primary"
				shape="circular"
				onClick={() => handleRemove(index)}
			/>
		</div>
	);
};

export default CharacterToken;
