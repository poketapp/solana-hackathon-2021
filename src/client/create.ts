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

const a = process.argv[2];
const b = process.argv[3];
const c = process.argv[4];
const d = process.argv[5];
const e = process.argv[6];
const f = process.argv[7];

async function main() {
	console.log("Let's say hello to a Solana account...");

	// Establish connection to the cluster
	await establishConnection();

	// Determine who pays for the fees
	await establishPayer();


	// Check if the program has been deployed
	await checkProgram(a, b, c, d, e);

	console.log('Creating Task');
	await createTask(a, b, c, d, e, f);

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
