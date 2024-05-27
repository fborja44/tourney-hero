import { readReplayDir } from '../events/file';
import { parentPort } from 'worker_threads';

parentPort?.on('message', async (data) => {
	// data = relay folder file path
	// Perform the task
	const result = await readReplayDir(data);
	console.log('Worker finished: ', data);

	// Send the result back to the main thread
	parentPort?.postMessage(result);
});
