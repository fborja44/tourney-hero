import { Caption2, makeStyles, shorthands } from '@fluentui/react-components';
import {
	// ColumnSingle16Regular,
	// BoardSplit16Regular,
	QuestionCircle16Regular
} from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import FooterButton from './button/FooterButton';
import { FOOTER_HEIGHT } from '@common/constants/elements';

const useStyles = makeStyles({
	footerContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		minHeight: '20px',
		height: FOOTER_HEIGHT,
		boxSizing: 'border-box',
		zIndex: 1000,
		color: tokens.colorNeutralForeground3,
		backgroundColor: tokens.colorNeutralBackground2,
		...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke3)
	},
	itemGroup: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		height: '100%'
	},
	copy: {
		width: 'fit-content',
		...shorthands.padding(0, tokens.spacingHorizontalS)
	}
});

const Footer = () => {
	const classes = useStyles();
	return (
		<footer className={classes.footerContainer}>
			<div className={classes.itemGroup}>
				{/* TODO */}
				<FooterButton icon={<QuestionCircle16Regular />} />
			</div>
			<div>
				<Caption2 className={classes.copy}>
					Francis &apos;beta&apos; Borja © 2023 - 2024
				</Caption2>
				{/* <FooterButton icon={<BoardSplit16Regular />} />
				<FooterButton icon={<ColumnSingle16Regular />} /> */}
			</div>
		</footer>
	);
};

export default Footer;
