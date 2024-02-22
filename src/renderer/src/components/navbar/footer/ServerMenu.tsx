import { useContext, useState } from 'react';
import { Button, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import MenuTextField from '../../form/inputs/MenuTextField';
import { SocketClientContext } from '../../../socket/SocketClientProvider';

const useStyles = makeStyles({
	menu: {
		backgroundColor: tokens.colorNeutralBackground3Selected,
		position: 'absolute',
		bottom: 0,
		left: '100%',
		height: 'fit-content',
		width: '280px',
		display: 'flex',
		flexDirection: 'column',
		zIndex: 100,
		boxShadow: tokens.shadow16,
		...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralStroke3),
		...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
		...shorthands.gap(tokens.spacingVerticalS)
	},
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'start',
		marginTop: tokens.spacingVerticalS
	},
	buttonSpacing: {
		marginRight: tokens.spacingHorizontalM
	}
});

interface ServerMenuProps {
	menuRef: React.RefObject<HTMLDivElement>;
}

const ServerMenu = ({ menuRef }: ServerMenuProps) => {
	const classes = useStyles();

	const {
		address: currentAddress,
		connected,
		connect,
		disconnect
	} = useContext(SocketClientContext);

	const [address, setAddress] = useState(currentAddress);
	const [password, setPassword] = useState('');

	// TODO: Add unsaved indicator

	return (
		<div className={classes.menu} ref={menuRef}>
			<MenuTextField
				label="Server Address"
				value={address}
				placeholder="Enter a server address"
				size="small"
				handleChange={(_ev, data) => {
					setAddress(data.value);
				}}
				disabled={connected}
				validationState={connected ? 'success' : 'none'}
				validationMessage={connected ? 'Connected' : ''}
			/>
			{!connected && (
				<>
					<MenuTextField
						label="Password"
						value={password}
						placeholder="Enter the server password"
						size="small"
						handleChange={(_ev, data) => {
							setPassword(data.value);
						}}
						type="password"
					/>
				</>
			)}
			<div className={classes.buttonsContainer}>
				{connected ? (
					<Button size="small" appearance="secondary" onClick={disconnect}>
						Disconnect
					</Button>
				) : (
					<Button
						size="small"
						appearance="primary"
						className={classes.buttonSpacing}
						onClick={() => {
							if (connect) {
								connect(address, password);
								setPassword('');
							}
						}}
						disabled={!connect}
					>
						Connect To Server
					</Button>
				)}
			</div>
		</div>
	);
};

export default ServerMenu;
