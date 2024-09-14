require("dotenv").config();

const app = require("./src/app");
app(process.env.PORT, process.env.HOST);