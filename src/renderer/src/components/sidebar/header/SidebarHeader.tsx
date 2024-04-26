import { Button, makeStyles, shorthands } from '@fluentui/react-components';
import { ChevronRight12Regular, ChevronLeft12Regular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import { MouseEventHandler } from 'react';
import { SECTION_HEADER_HEIGHT } from '@common/constants/elements';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		boxSizing: 'border-box',
		backgroundColor: tokens.colorNeutralBackground2,
		width: '100%',
		height: SECTION_HEADER_HEIGHT,
		...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke3),
		...shorthands.padding(0, tokens.spacingHorizontalM)
	},
	open: {
		justifyContent: 'space-between'
	},
	closed: {
		justifyContent: 'center'
	}
});

interface SidebarProps {
	children: React.ReactNode;
	open?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

const SidebarHeader = ({ onClick, open, children }: SidebarProps) => {
	const classes = useStyles();

	return (
		<div className={`${classes.container} ${open ? classes.open : classes.closed}`}>
			{open && children}
			{onClick && (
				<Button
					icon={open ? <ChevronRight12Regular /> : <ChevronLeft12Regular />}
					appearance="outline"
					onClick={onClick}
					size="small"
				/>
			)}
		</div>
	);
};

SidebarHeader.defaultProps = {
	open: true
};

export default SidebarHeader;
