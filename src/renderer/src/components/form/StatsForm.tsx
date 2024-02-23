import { Body1, Button } from '@fluentui/react-components';
import Panel from '../panel/Panel';
import TextField from './inputs/TextField';
import formStyles from './styles/FormStyles';

const StatsForm = () => {
	const classes = formStyles();

	const handleClick = async () => {
		const filePaths = await window.api.getFileStats();
		console.log(filePaths);
	};

	return (
		<Panel>
			<div className={`${classes.formSection} ${classes.borderBottom}`}>
				<Body1 className={classes.sectionTitle}>Set Information</Body1>
				<div className={classes.formRow}>
					<TextField
						label="Player 1 Tag"
						value={''}
						targetField={'p1tag'}
						handleChange={() => {}}
						placeholder="Player 1"
					/>
					<span className={classes.gap} />
					<TextField
						label="Player 2 Tag"
						value={''}
						targetField={'p2tag'}
						handleChange={() => {}}
						placeholder="Player 2"
					/>
					<span className={classes.gap} />
					<TextField
						label="Round Name"
						value={''}
						targetField={'roundName'}
						handleChange={() => {}}
						placeholder="Winners Round 1"
					/>
				</div>
			</div>
			<div className={classes.formSection}>
				<Body1 className={classes.sectionTitle}>Slippi Replay Upload</Body1>
				<Button size="small" appearance="primary" onClick={handleClick}>
					Select Replays
				</Button>
			</div>
		</Panel>
	);
};

export default StatsForm;
