import { Body1, makeStyles, tokens } from '@fluentui/react-components';
import React from 'react';

const useStyles = makeStyles({
	title: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: tokens.spacingHorizontalSNudge,
		color: tokens.colorNeutralForeground2
	},
	icon: {
		color: tokens.colorNeutralForeground1,
		width: '20px',
		height: '20px'
	}
});

interface SidebarTitleProps {
	iconSrc?: string;
	children: React.ReactNode;
}

const SidebarTitle = ({ iconSrc, children }: SidebarTitleProps) => {
	const classes = useStyles();

	return (
		<div className={classes.title}>
			{iconSrc && <img src={iconSrc} className={classes.icon} />}
			<Body1>{children}</Body1>
		</div>
	);
};

export default SidebarTitle;
