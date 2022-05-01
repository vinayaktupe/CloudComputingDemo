const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

app.enable("trust proxy");

//IMPLEMENT CORS
app.use(cors());
app.options("*", cors());

//STATIC CONTENT DIRECTORY
app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public/index.html"), (err) => {
		if (err) console.log(err);
	});
});

module.exports = app;
