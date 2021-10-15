import {
	createTask,
	readTask,
} from './hello_world';

async function main(name: string, lat: string, lng: string, points: string, desc: string) {
	console.log("Creating Task");
	await createTask(name, lat, lng, points, desc);

	console.log('Reading Task');
	await readTask();

	console.log('Success');
}