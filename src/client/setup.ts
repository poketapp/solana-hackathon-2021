/**
 * Hello world
 */

import {
	establishConnection,
	establishPayer,
	checkProgram,
} from './hello_world';

async function setup() {
	console.log("Setting up Solana");

	// Establish connection to the cluster
	await establishConnection();

	// Determine who pays for the fees
	await establishPayer();


	// Check if the program has been deployed
	await checkProgram('Solana Task', '78.1', '77.0', '250', 'This is a test task for the Solana Hackathon');

	console.log('Success');
}

setup().then(
	() => process.exit(),
	err => {
		console.error(err);
		process.exit(-1);
	},
);
