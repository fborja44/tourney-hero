import { HeadData } from '@common/interfaces/Data';
import { Button, makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';
import { Dismiss16Regular } from '@fluentui/react-icons';
import CharacterIcon from '@renderer/components/character/CharacterIcon';

interface CharacterTokenProps {
	head: HeadData;
	index: number;
	handleRemove: (index: number) => void;
	handleToggle: (index: number) => void;
}

const useStyles = makeStyles({
	token: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: tokens.spacingHorizontalXS,
		backgroundColor: tokens.colorBrandBackground,
		...shorthands.borderRadius(tokens.borderRadiusCircular),
		...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingHorizontalS),
		'&:hover': {
			cursor: 'pointer'
		}
	},
	toggled: {
		backgroundColor: tokens.colorNeutralBackground1
	}
});

const CharacterToken = ({ head, index, handleRemove, handleToggle }: CharacterTokenProps) => {
	const classes = useStyles();

	if (!head.characterId) return null;

	return (
		<div
			className={mergeClasses(classes.token, head.isToggled ? classes.toggled : '')}
			onClick={() => handleToggle(index)}
		>
			<CharacterIcon characterId={head.characterId} size={20} />
			<Button
				icon={<Dismiss16Regular />}
				size="small"
				appearance={head.isToggled ? 'subtle' : 'primary'}
				shape="circular"
				onClick={(ev) => {
					ev.stopPropagation();
					handleRemove(index);
				}}
			/>
		</div>
	);
};

export default CharacterToken;
