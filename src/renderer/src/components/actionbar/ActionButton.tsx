import React, { useRef, useEffect } from 'react';
import {
	Caption1Strong,
	Caption2,
	MenuButton,
	makeStyles,
	shorthands
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { useState } from 'react';
import { handleClickOutside, handleEscapeKey } from '@renderer/utils/menu';

const useStyles = makeStyles({
	container: {
		height: '100%',
		position: 'relative'
	},
	button: {
		height: '100%',
		boxSizing: 'border-box',
		...shorthands.borderRadius(0),
		...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke3),
		':hover': {
			backgroundColor: tokens.colorNeutralBackground4Hover,
			...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke3)
		},
		':hover svg': {
			color: tokens.colorNeutralForeground1
		}
	},
	contentContainer: {
		display: 'flex',
		flexDirection: 'column',
		...shorthands.padding(0, tokens.spacingHorizontalM, 0, tokens.spacingHorizontalS)
	},
	content: {
		minWidth: '105px',
		maxWidth: '135px',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		...shorthands.overflow('hidden')
	},
	title: {
		color: tokens.colorNeutralForeground3
	},
	menu: {
		backgroundColor: tokens.colorNeutralBackground4Selected,
		position: 'absolute',
		zIndex: 100,
		boxShadow: tokens.shadow16,
		...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke3),
		...shorthands.padding(
			tokens.spacingVerticalM,
			tokens.spacingHorizontalL,
			tokens.spacingVerticalL,
			tokens.spacingHorizontalL
		)
	}
});

interface ActionButtonProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: any;
	title: string;
	children: React.ReactNode;
	width?: string;
	full?: boolean;
	menu: React.ReactNode;
}

const ActionButton = ({ children, title, icon, width, full, menu }: ActionButtonProps) => {
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
			<MenuButton
				icon={icon}
				appearance="subtle"
				className={classes.button}
				style={{
					width: width ?? '200px',
					backgroundColor: menuOpen ? tokens.colorNeutralBackground4Selected : ''
				}}
				onClick={handleClick}
				ref={buttonRef}
			>
				<div className={classes.contentContainer}>
					<Caption1Strong className={classes.content}>{children}</Caption1Strong>
					<Caption2 className={classes.title}>{title}</Caption2>
				</div>
			</MenuButton>
			{menuOpen && (
				<section
					className={classes.menu}
					style={{
						height: full ? 'calc(100vh - 60px)' : 'fit-content',
						width: full ? '100%' : '300px'
					}}
					ref={menuRef}
				>
					{menu}
				</section>
			)}
		</div>
	);
};

export default ActionButton;
