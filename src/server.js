const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
var bodyParser = require("body-parser");
var cors = require("cors");
const path = require("path");

// global Var
const port = 5025;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Cror config
app.use(
  cors({
    origin: "*",
  })
);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const sourcePath = path.join(__dirname, "source");
app.use("/", express.static(sourcePath));
app.get("*", function (req, res) {
  res.sendFile(path.join(sourcePath, "index.html"));
});

//create server
server.listen(port, () => {
  console.log(`SERVER is running on PORT *: ${port}`);
});
