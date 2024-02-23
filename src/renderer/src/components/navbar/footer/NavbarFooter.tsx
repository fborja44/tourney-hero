import {
	Caption1,
	Caption2,
	Button,
	makeStyles,
	shorthands,
	mergeClasses
} from '@fluentui/react-components';
import { ChevronRight12Regular, ChevronLeft12Regular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import ServerMenu from './ServerMenu';
import { useEffect, useRef, useState } from 'react';
import { handleClickOutside, handleEscapeKey } from '@renderer/utils/menu';
import { NAVBAR_FOOTER_HEIGHT } from '@common/constants/elements';

const useStyles = makeStyles({
	container: {
		position: 'relative'
	},
	button: {
		width: '100%',
		height: NAVBAR_FOOTER_HEIGHT,
		backgroundColor: tokens.colorNeutralBackground2,
		zIndex: 10,
		boxSizing: 'border-box',
		...shorthands.padding(0, tokens.spacingHorizontalL),
		...shorthands.borderRadius(0),
		...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke3),
		':hover': {
			backgroundColor: tokens.colorNeutralBackground4Hover,
			...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke3)
		}
	},
	contentContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		...shorthands.padding(0, tokens.spacingHorizontalM)
	},
	content: {
		width: '100%'
	},
	title: {
		color: tokens.colorNeutralForeground3
	},
	iconBackground: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '28px',
		width: '28px',
		minWidth: '28px',
		color: tokens.colorNeutralForeground3,
		backgroundColor: tokens.colorNeutralBackground2Hover,
		...shorthands.borderRadius('1000px')
	},
	open: {
		backgroundColor: tokens.colorNeutralBackground3Selected
	}
});

interface NavbarFooterProps {
	icon: JSX.Element;
	title: string;
	children: React.ReactNode;
	to: string;
}

const NavbarFooter = ({ children, title, icon }: NavbarFooterProps) => {
	const classes = useStyles();

	// Reference for menu
	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const [menuOpen, setMenuOpen] = useState(false);

	const handleClick = () => {
		setMenuOpen((prevMenuOpen) => !prevMenuOpen);
	};

	useEffect(() => {
		document.addEventListener('mousedown', (event) =>
			handleClickOutside(event, menuRef, buttonRef, setMenuOpen)
		);
		document.addEventListener('keydown', (event) => handleEscapeKey(event, setMenuOpen));

		return () => {
			document.removeEventListener('mousedown', (event) =>
				handleClickOutside(event, menuRef, buttonRef, setMenuOpen)
			);
			document.removeEventListener('keydown', (event) => handleEscapeKey(event, setMenuOpen));
		};
	}, []);

	return (
		<div className={classes.container}>
			<Button
				icon={<div className={classes.iconBackground}>{icon}</div>}
				appearance="subtle"
				className={mergeClasses(classes.button, menuOpen ? classes.open : '')}
				onClick={handleClick}
				ref={buttonRef}
			>
				<div className={classes.contentContainer}>
					<Caption2 className={classes.title}>{title}</Caption2>
					<Caption1 className={classes.content}>{children}</Caption1>
				</div>
				{menuOpen ? <ChevronLeft12Regular /> : <ChevronRight12Regular />}
			</Button>
			{menuOpen && <ServerMenu menuRef={menuRef} />}
		</div>
	);
};

export default NavbarFooter;
