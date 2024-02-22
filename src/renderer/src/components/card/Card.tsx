import { makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';

export const cardWidth = '250px';

const useStyles = makeStyles({
	container: {
		width: cardWidth
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		...shorthands.padding(0, tokens.spacingHorizontalM),
		backgroundColor: tokens.colorNeutralBackground4Selected,
		...shorthands.borderRadius(tokens.borderRadiusLarge),
		...shorthands.border('1px', 'solid', tokens.colorNeutralStroke3)
	},
	withBorder: {
		...shorthands.borderRadius(0, 0, tokens.borderRadiusLarge, tokens.borderRadiusLarge)
	},
	border: {
		backgroundColor: tokens.colorPaletteGreenForeground1,
		width: '100%',
		height: '5px',
		...shorthands.borderRadius(tokens.borderRadiusLarge, tokens.borderRadiusLarge, 0, 0)
	}
});

interface CardProps {
	borderColor?: string;
	children: React.ReactNode;
}

const Card = ({ borderColor, children }: CardProps) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			{borderColor && (
				<div className={classes.border} style={{ backgroundColor: borderColor }} />
			)}
			<div
				className={
					borderColor
						? mergeClasses(classes.content, classes.withBorder)
						: classes.content
				}
			>
				{children}
			</div>
		</div>
	);
};

export default Card;
