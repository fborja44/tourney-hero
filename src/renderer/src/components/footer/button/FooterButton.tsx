import { Button, makeStyles } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';

interface FooterButtonProps {
	children?: React.ReactNode;
	icon?: JSX.Element;
}

const useStyles = makeStyles({
	button: {
		color: tokens.colorNeutralForeground3
	}
});

const FooterButton = ({ children, icon }: FooterButtonProps) => {
	const classes = useStyles();
	return (
		<Button icon={icon} appearance="transparent" className={classes.button}>
			{children}
		</Button>
	);
};

export default FooterButton;
