import React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';
import {
	ACTIONBAR_HEIGHT,
	FOOTER_HEIGHT,
	MESSAGE_BAR_HEIGHT,
	SECTION_HEADER_HEIGHT
} from '@common/constants/elements';
import EmptyPanel from './EmptyPanel';
import { useSelector } from 'react-redux';
import { AppState } from '@renderer/redux/reducers/rootReducer';

const useStyles = makeStyles({
	container: {
		boxSizing: 'border-box',
		backgroundColor: tokens.colorNeutralBackground2,
		width: '100%',
		height: `calc(100vh - ${ACTIONBAR_HEIGHT} - ${SECTION_HEADER_HEIGHT} - ${FOOTER_HEIGHT})`,
		...shorthands.overflow('hidden', 'auto')
	},
	containerMessageBar: {
		height: `calc(100vh - ${ACTIONBAR_HEIGHT} - ${SECTION_HEADER_HEIGHT} - ${FOOTER_HEIGHT} - ${MESSAGE_BAR_HEIGHT})` // TODO: TEMPORARY FIX
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
	as?: 'section' | 'form';
}

const Panel = ({ children, as = 'form' }: PanelProps) => {
	const classes = useStyles();

	const { connected } = useSelector((state: AppState) => state.slippiState);

	return as === 'form' ? (
		<form
			className={mergeClasses(
				classes.container,
				connected ? classes.containerMessageBar : ''
			)}
		>
			{children || <EmptyPanel />}
		</form>
	) : (
		<section className={classes.container}>
			{children || <EmptyPanel text="Nothing to do." />}
		</section>
	);
};

export default Panel;
