/**
 * Hello world
 */

import {
	establishConnection,
	establishPayer,
	checkProgram,
	completeTask,
	readTask,
} from './hello_world';

async function main() {
	console.log("Let's say hello to a Solana account...");

	// Establish connection to the cluster
	await establishConnection();

	// Determine who pays for the fees

	await establishPayer('Test task', '123', '124', '100', 'this is a long description');


	// Check if the program has been deployed
	await checkProgram('Test task', '123', '124', '100', 'this is a long description');

	console.log('about to complete task');
	// Complete task
	//	await completeTask();

	await completeTask('Test task', '123', '124', '100', 'this is a long description');

	console.log('about to read task');
	// Read task
	await readTask();

	console.log('Done reading task');

	console.log('Success');
}

main().then(
	() => process.exit(),
		err => {
		console.error(err);
		process.exit(-1);
	},
);
