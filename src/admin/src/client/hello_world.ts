/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
	Keypair,
	Connection,
	PublicKey,
	TransactionInstruction,
	Transaction,
	sendAndConfirmTransaction,
} from '@solana/web3.js';
import * as borsh from 'borsh';

/**
 * Connection to the network
 */
let connection: Connection;

/**
 * Keypair associated to the fees' payer
 */
let payer: Keypair;

/**
 * Hello world's program id
 */
let programId: PublicKey;

/**
 * The public key of the account we are saying hello to
 */
let taskPubkey: PublicKey;

/* 
 * The state of task managed by the program
 */
class Task {
	name = 'Test task';
	lat = '123';
	lng = '124';
	points = "100";
	desc = 'this is a long description';
	completedBy = '00000000000000000000000000000000000000000000';

	constructor(fields: { name: string, lat: string, lng: string, points: string, desc: string, completedBy: string }) {
		if (fields) {
			this.name = fields.name;
			this.lat = fields.lat;
			this.lng = fields.lng;
			this.points = fields.points;
			this.desc = fields.desc;
			this.completedBy = fields.completedBy;
		}
	}

}

/**
 * Borsh schema definition for greeting accounts
 */
const TaskSchema = new Map([
	[Task, { kind: 'struct', fields: [['name', 'String'], ['lat', 'String'], ['lng', 'String'], ['points', 'String'], ['desc', 'String'], ['completedBy', 'String']] }],
]);


/*
 * Create task
 */

export async function createTask(name: string, lat: string, lng: string, points: string, desc: string): Promise<void> {

	const TASK = borsh.serialize(TaskSchema, new Task({ name: name, lat: lat, lng: lng, points: points, desc: desc, completedBy: '00000000000000000000000000000000000000000000' }));

	const instructionData = Buffer.alloc(TASK.length);

	instructionData.fill(TASK);

	const instruction = new TransactionInstruction({
		keys: [{ pubkey: taskPubkey, isSigner: false, isWritable: true }],
		programId,
		data: instructionData,
	});
	await sendAndConfirmTransaction(connection, new Transaction().add(instruction), [payer]);
}


/*
 * Complete Task
 */
export async function completeTask(name: string, lat: string, lng: string, points: string, desc: string): Promise<void> {

	const addr = payer.publicKey.toBase58();
	const TASK = borsh.serialize(TaskSchema, new Task({ name: name, lat: lat, lng: lng, points: points, desc: desc, completedBy: addr }));

	const instructionData = Buffer.alloc(TASK.length);

	instructionData.fill(TASK);

	const instruction = new TransactionInstruction({
		keys: [{ pubkey: taskPubkey, isSigner: false, isWritable: true }],
		programId,
		data: instructionData,
	});
	await sendAndConfirmTransaction(connection, new Transaction().add(instruction), [payer]);
}


/**
 * Get the task from on-chain
 */
export async function readTask(): Promise<void> {
	const taskInfo = await connection.getAccountInfo(taskPubkey);
	if (taskInfo === null) {
		throw 'Error: cannot find the task account';
	}
	console.log('task is');
	console.log(taskInfo.data.length);
	const task = borsh.deserializeUnchecked(TaskSchema, Task, taskInfo.data);
	console.log(taskPubkey.toBase58(), 'is', task);
}
