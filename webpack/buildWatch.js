const path = require("path");
const watch = require("node-watch");
const {spawn} = require("child_process");
const debounce = require("debounce");

const pathToWatch = path.resolve(__dirname, "../src");

console.log("Watching", pathToWatch);

const execProcess = debounce(() => {
	console.log("Updating");
	const process = spawn("npm", ["run", "build"]);

	process.stdout.on("data", (data) => {
		console.log(data.toString());
	});

	process.stderr.on("data", (data) => {
		console.log(data.toString());
	});

	process.on("exit", (code) => {
		console.log("Process exited with code " + code.toString());
	});
}, 200);

watch(pathToWatch, {
	"recursive": true
}, (evt, name) => {
	execProcess();
});
