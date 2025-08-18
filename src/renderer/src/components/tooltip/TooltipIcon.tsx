import {
	Caption1,
	makeStyles,
	Popover,
	PopoverSurface,
	PopoverTrigger,
	shorthands,
	tokens
} from '@fluentui/react-components';
import { QuestionCircleRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
	info: {
		cursor: 'pointer'
	},
	popover: {
		...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),
		maxWidth: '450px',
		textAlign: 'center'
	}
});

interface TooltipIconProps {
	icon?: React.ElementType;
	children: React.ReactNode;
}

const TooltipIcon = ({ children, icon: Icon = QuestionCircleRegular }: TooltipIconProps) => {
	const classes = useStyles();

	return (
		<Popover withArrow mouseLeaveDelay={3} size="small">
			{/* TODO: Make own component */}
			<PopoverTrigger disableButtonEnhancement>
				<Icon className={classes.info} />
			</PopoverTrigger>
			<PopoverSurface className={classes.popover}>
				<Caption1>{children}</Caption1>
			</PopoverSurface>
		</Popover>
	);
};

export default TooltipIcon;
