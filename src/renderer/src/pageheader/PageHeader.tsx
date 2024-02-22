import { Body1, makeStyles, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { SECTION_HEADER_HEIGHT } from '@renderer/constants/elements';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		boxSizing: 'border-box',
		backgroundColor: tokens.colorNeutralBackground2,
		width: '100%',
		height: SECTION_HEADER_HEIGHT,
		...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3)
	},
	title: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		'& span': {
			fontWeight: tokens.fontWeightRegular
		},
		'& svg': {
			...shorthands.margin(0, tokens.spacingHorizontalS, 0, 0)
		}
	}
});

export interface PageHeaderProps {
	title: string;
	icon?: React.ReactNode | JSX.Element;
	children?: React.ReactNode;
}

const PageHeader = ({ title, children, icon }: PageHeaderProps) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.title}>
				{icon}
				<Body1>{title}</Body1>
			</div>
			{children}
		</div>
	);
};

export default PageHeader;
