import { Caption1, Spinner, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import Searchbar, { SearchbarProps } from './searchbar/Searchbar';
import { ACTIONBAR_HEIGHT, FOOTER_HEIGHT, SECTION_HEADER_HEIGHT } from '@common/constants/elements';
import SidebarPlaceholder from '../placeholder/SidebarPlaceholder';
import React from 'react';
import { SparkleRegular } from '@fluentui/react-icons';
import SidebarActions, { SidebarActionsProps } from '../actions/SidebarActions';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	itemList: {
		display: 'flex',
		flexDirection: 'column',
		...shorthands.overflow('hidden', 'auto'),
		height: `calc(100vh - ${ACTIONBAR_HEIGHT} - ${SECTION_HEADER_HEIGHT} - ${FOOTER_HEIGHT})`
	},
	moreButton: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		height: 'fit-content',
		minHeight: '24px',
		...shorthands.gap(tokens.spacingHorizontalS),
		...shorthands.margin(tokens.spacingVerticalS, 0)
	},
	empty: {
		alignSelf: 'center',
		color: tokens.colorNeutralForeground2,
		...shorthands.margin(tokens.spacingVerticalL)
	},
	spinner: {
		marginTop: tokens.spacingVerticalXXXL
	}
});

interface SidebarMenuContentProps {
	children: React.ReactNode;
	empty?: boolean;
	disabled?: boolean;
	loading?: boolean;
	error?: string | boolean | null;
	placeholderIcon?: React.ReactNode;
	placeholderText?: string;
}

const SidebarMenuContent = ({
	children,
	empty,
	disabled,
	error,
	loading,
	placeholderIcon,
	placeholderText
}: SidebarMenuContentProps) => {
	const classes = useStyles();

	if (disabled) {
		return <SidebarPlaceholder icon={placeholderIcon} caption={placeholderText} />;
	}

	if (loading) {
		return <Spinner size="small" className={classes.spinner} />;
	}

	if (error) {
		return <Caption1 className={classes.empty}>An Error Has Occurred</Caption1>;
	}

	if (empty) {
		return <Caption1 className={classes.empty}>No Items Found</Caption1>;
	}

	return <div className={classes.itemList}>{children}</div>;
};

interface SidebarMenuProps extends SearchbarProps, SidebarMenuContentProps, SidebarActionsProps {
	children: React.ReactNode;
}

const SidebarMenu = ({
	children,
	searchTerm,
	setSearchTerm,
	loading,
	disabled,
	empty,
	error,
	placeholderIcon,
	placeholderText,
	actions
}: SidebarMenuProps) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			{!disabled && <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
			{!disabled && actions?.length && <SidebarActions actions={actions} />}
			<SidebarMenuContent
				loading={loading}
				empty={empty}
				error={error}
				disabled={disabled}
				placeholderIcon={placeholderIcon}
				placeholderText={placeholderText}
			>
				{children}
			</SidebarMenuContent>
		</div>
	);
};

SidebarMenu.defaultProps = {
	placeholderIcon: <SparkleRegular />,
	placeholderText: 'Nothing To Do'
};

export default SidebarMenu;
