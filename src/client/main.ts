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

const name = process.argv[2];
const lat = process.argv[3];
const lng = process.argv[4];
const points = process.argv[5];
const desc = process.argv[6];

async function main(name, lat, lng, points, desc) {
	console.log("Let's say hello to a Solana account...");

	// Establish connection to the cluster
	await establishConnection();

	// Determine who pays for the fees
	await establishPayer();


	// Check if the program has been deployed
	await checkProgram(name, lat, lng, points, desc);

	console.log('Creating Task');
	await createTask(name, lat, lng, points, desc);

	console.log('Reading Task');
	await readTask(name, lat, lng, points, desc);

	console.log('Completing task');
	await completeTask(name, lat, lng, points, desc);

	console.log('Reading Task');
	await readTask();

	console.log('Success');
}

main(name, lat, lng, points, desc).then(
	() => process.exit(),
	err => {
		console.error(err);
		process.exit(-1);
	},
);
