const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require("child_process");
const cors = require('cors');

var jsonParser = bodyParser.json()

var app = express();
app.use(jsonParser);
app.use(cors({origin: 'http://localhost:8080'}));

app.get('/', (req, res) => {
	exec("cd ../", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
	exec("ls -la", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
	exec("npm run start", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
	res.send('End of Get Call')
});
app.post('/create', (req, res) => {
	console.log(req.body);

	body = req.body;
	arg = body.name + ' ' + body.lat + ' ' + body.lng + ' ' + body.points + ' ' + body.desc + ' ' + 'test_image';
	console.log('arg is ');
	console.log(arg);

	exec("cd ../", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
	exec("ls -la", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
	exec("npm run create -- " + arg, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(200)
});
app.listen(process.env.PORT || 3000)
