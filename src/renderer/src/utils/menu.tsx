/**
 * Closes a menu when clicking outside of it or on its toggle button.
 * @param event The click event
 * @param menuRef React reference to the menu
 * @param buttonRef React reference to the button (used to create toggle behavior)
 * @param setMenuOpen Set state function for menu open
 */
export const handleClickOutside = (
	event: MouseEvent,
	menuRef: React.RefObject<HTMLDivElement>,
	buttonRef: React.RefObject<HTMLButtonElement>,
	setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
	if (
		menuRef.current &&
		!menuRef.current.contains(event.target as Node) &&
		buttonRef.current &&
		!buttonRef.current.parentElement?.contains(event.target as Node)
	) {
		setMenuOpen(false);
	}
};

/**
 * Closes a menu if the escape key is pressed.
 * @param event A keypress event
 * @param setMenuOpen Set state function for menu open
 */
export const handleEscapeKey = (
	event: KeyboardEvent,
	setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
	if (event.key === 'Escape') {
		setMenuOpen(false);
	}
};
