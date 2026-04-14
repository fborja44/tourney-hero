import React, { useRef, useEffect } from 'react';
import {
	Caption1Strong,
	Caption2,
	MenuButton,
	makeStyles,
	mergeClasses,
	shorthands
} from '@fluentui/react-components';
import { appTokens } from '@renderer/theme';
import { useState } from 'react';
import { handleClickOutside, handleEscapeKey } from '@renderer/utils/menu';
import { capitalize } from '@renderer/utils/string';

const generateColorStyles = (type: 'success' | 'warning' | 'danger') => {
	return {
		backgroundColor: appTokens[`colorTheme${capitalize(type)}10`],
		color: appTokens[`colorTheme${capitalize(type)}130`],
		':hover': {
			color: appTokens[`colorTheme${capitalize(type)}140`],
			backgroundColor: appTokens[`colorTheme${capitalize(type)}20`],
			...shorthands.borderRight('1px', 'solid', appTokens.colorNeutralStroke3),
			'& .action-button-title': {
				color: appTokens[`colorTheme${capitalize(type)}110`]
			},
			'& .fui-Button__icon': {
				color: appTokens[`colorTheme${capitalize(type)}130`]
			}
		},
		':active:hover': {
			color: appTokens[`colorTheme${capitalize(type)}140`],
			backgroundColor: appTokens[`colorTheme${capitalize(type)}30`],
			'& .fui-Button__icon': {
				color: appTokens[`colorTheme${capitalize(type)}130`]
			}
		},
		'& .action-button-title': {
			color: appTokens[`colorTheme${capitalize(type)}100`]
		}
	};
};

const useStyles = makeStyles({
	container: {
		height: '100%',
		position: 'relative'
	},
	defaultColors: {
		backgroundColor: appTokens.colorNeutralBackground4,
		':hover': {
			backgroundColor: appTokens.colorNeutralBackground4Selected,
			...shorthands.borderRight('1px', 'solid', appTokens.colorNeutralStroke3)
		},
		':hover svg': {
			color: appTokens.colorNeutralForeground1
		},
		'& .action-button-title': {
			color: appTokens.colorNeutralForeground4,
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			width: '95px',
			...shorthands.overflow('hidden')
		}
	},
	successColors: generateColorStyles('success'),
	successSelected: {
		backgroundColor: appTokens.colorThemeSuccess10
	},
	warningColors: generateColorStyles('warning'),
	warningSelected: {
		backgroundColor: appTokens.colorThemeWarning10
	},
	dangerColors: generateColorStyles('danger'),
	dangerSelected: {
		backgroundColor: appTokens.colorThemeDanger10
	},
	button: {
		height: '100%',
		boxSizing: 'border-box',
		...shorthands.borderRadius(0),
		...shorthands.borderRight('1px', 'solid', appTokens.colorNeutralStroke3),
		':hover': {
			...shorthands.borderRight('1px', 'solid', appTokens.colorNeutralStroke3)
		}
	},
	contentContainer: {
		display: 'flex',
		flexDirection: 'column',
		...shorthands.padding(0, appTokens.spacingHorizontalM, 0, appTokens.spacingHorizontalS)
	},
	content: {
		minWidth: '105px',
		maxWidth: '135px',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		...shorthands.overflow('hidden')
	},
	menu: {
		display: 'flex',
		flexDirection: 'column',
		rowGap: appTokens.spacingVerticalL,
		backgroundColor: appTokens.colorNeutralBackground4Selected,
		position: 'absolute',
		zIndex: 100,
		boxShadow: appTokens.shadow16,
		...shorthands.borderTop('1px', 'solid', appTokens.colorNeutralStroke3),
		...shorthands.padding(
			appTokens.spacingVerticalM,
			appTokens.spacingHorizontalL,
			appTokens.spacingVerticalL,
			appTokens.spacingHorizontalL
		)
	}
});

export interface ActionButtonProps {
	icon: React.ElementType;
	title: string;
	children: React.ReactNode;
	width?: string;
	full?: boolean;
	menu: React.ReactNode;
	color?: 'default' | 'success' | 'warning' | 'danger';
}

const ActionButton = ({
	children,
	title,
	icon: Icon,
	width,
	full,
	menu,
	color = 'default'
}: ActionButtonProps) => {
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
				icon={<Icon />}
				appearance="subtle"
				className={mergeClasses(classes.button, classes[color + 'Colors'])}
				style={{
					width: width ?? '200px',
					backgroundColor: menuOpen
						? color !== 'default'
							? classes[color + 'Selected']
							: appTokens.colorNeutralBackground4Selected
						: ''
				}}
				onClick={handleClick}
				ref={buttonRef}
			>
				<div className={classes.contentContainer}>
					<Caption1Strong className={classes.content}>{children}</Caption1Strong>
					<Caption2 className="action-button-title">{title}</Caption2>
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
