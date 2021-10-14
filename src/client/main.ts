/**
 * Hello world
 */

import {
	establishConnection,
	establishPayer,
	checkProgram,
	createTask,
	completeTask,
	readTask,
} from './hello_world';

async function main() {
	console.log("Let's say hello to a Solana account...");

	// Establish connection to the cluster
	await establishConnection();

	// Determine who pays for the fees
	await establishPayer();


	// Check if the program has been deployed
	await checkProgram('Solana Task', '78.1', '77.0', '250', 'This is a test task for the Solana Hackathon');
	
	console.log('Creating Task');
	await createTask('Solana Task', '78.1', '77.0', '250', 'This is a test task for the Solana Hackathon');
	
	console.log('Reading Task');
	await readTask();

	console.log('Completing task');
	await completeTask('Solana Task', '78.1', '77.0', '250', 'This is a test task for the Solana Hackathon');

	console.log('Reading Task');
	await readTask();

	console.log('Success');
}

main().then(
	() => process.exit(),
		err => {
		console.error(err);
		process.exit(-1);
	},
);
