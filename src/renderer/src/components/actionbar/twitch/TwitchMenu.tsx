import { useState } from 'react';
import MenuTextField from '../../form/inputs/MenuTextField';
import { shorthands, tokens, makeStyles, Button, Caption1 } from '@fluentui/react-components';

const useStyles = makeStyles({
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		...shorthands.margin(tokens.spacingVerticalM, 0, 0, 0),
		'& button': {
			...shorthands.margin(0, tokens.spacingHorizontalM, 0, 0)
		}
	},
	section: {
		...shorthands.margin(0, 0, tokens.spacingVerticalS, 0)
	},
	spacing: {
		marginBottom: tokens.spacingVerticalS
	}
});

const TwitchMenu = () => {
	const classes = useStyles();

	const [address, setAddress] = useState('');
	// TODO: change
	const connected = false;

	const handleConnect = async () => {};

	return (
		<>
			<div>
				<Caption1>Twitch Configuration</Caption1>
				<MenuTextField
					label="API Key"
					value={address}
					placeholder="Enter your Twitch API key"
					size="small"
					handleChange={(_ev, data) => {
						setAddress(data.value);
					}}
					className={classes.spacing}
					disabled={connected}
				/>
				<div className={classes.buttonsContainer}>
					{!connected && (
						<Button
							size="small"
							appearance="primary"
							onClick={handleConnect}
							iconPosition="after"
						>
							Connect
						</Button>
					)}
					{connected && (
						<Button
							size="small"
							appearance="primary"
							onClick={() => {}}
							iconPosition="after"
						>
							Disconnect
						</Button>
					)}
					<Button
						size="small"
						appearance="secondary"
						onClick={() => {}}
						iconPosition="after"
					>
						Clear API Key
					</Button>
				</div>
			</div>
		</>
	);
};

export default TwitchMenu;
