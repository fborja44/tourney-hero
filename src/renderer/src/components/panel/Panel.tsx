import React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import { ACTIONBAR_HEIGHT, FOOTER_HEIGHT, SECTION_HEADER_HEIGHT } from '@common/constants/elements';
import EmptyPanel from './EmptyPanel';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		boxSizing: 'border-box',
		backgroundColor: tokens.colorNeutralBackground2,
		width: '100%',
		height: `calc(100vh - ${ACTIONBAR_HEIGHT} - ${SECTION_HEADER_HEIGHT} - ${FOOTER_HEIGHT})`,
		...shorthands.overflow('hidden', 'auto')
	},
	empty: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		color: tokens.colorNeutralForeground3,
		'& .text': {
			marginBottom: tokens.spacingVerticalS
		}
	}
});

interface PanelProps {
	children?: React.ReactNode;
	as: 'section' | 'form';
}

const Panel = ({ children, as }: PanelProps) => {
	const classes = useStyles();

	return as === 'form' ? (
		<form className={classes.container}>{children || <EmptyPanel />}</form>
	) : (
		<section className={classes.container}>
			{children || <EmptyPanel text="Nothing to do." />}
		</section>
	);
};

Panel.defaultProps = {
	as: 'form'
};

export default Panel;
