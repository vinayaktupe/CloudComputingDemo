process.on("uncaughtException", (err) => {
	console.log("Uncaught exception! Shutting down...");
	console.log(err.name, err.message);
	process.exit(1);
});

const app = require("./app");

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
	console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
	console.log("Unhandled Rejection! Shutting down...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

process.on("SIGTERM", () => {
	console.log("SIGTERM RECEIVED. SHUTTING DOWN GRACEFULLY...");
	server.close(() => {
		console.log(`PROCESS TERMINATED...`);
	});
});
