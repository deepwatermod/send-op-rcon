const fs = require("fs")
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();

app.use(cors());
app.use(bodyParser.json());

function loadConfig() {
	try {
		const data = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'))
		return data;
	} catch (err) {
		console.error(err)
		return false;
	}
}

const config = loadConfig();

if (config !== false) {
	app.post("/op-user", (req, res, next) => {
		try {
			const user = req.body.user;
			const regex = /^([a-zA-Z]|\d|\-|\_){0,100}$/;

			console.log("try /op user: ", user);

			if (`${user}`.match(regex) === null) {
				res.sendStatus(400);
				return;
			}

			http
				.get(`${config.rcon.url}/op/${user}`, (resp) => {
					res.sendStatus(200);
				})
				.on("error", (err) => {
					console.error(err);
					res.sendStatus(500);
				});
		} catch (err) {
			console.error(err);
			res.sendStatus(500);
		}
	});

	app.listen(config.server.port, function () {
		console.log(`op-user-over-web server started... listening on port ${config.server.port}`);
	});
}
