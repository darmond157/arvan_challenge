require("dotenv").config();
const fastify = require("fastify")({ logger: process.env.LOGGER });

require("./src/plugins/postgres")(fastify).catch((err) => {
	console.log(err);
});

fastify.register("./src/routes");

fastify.listen({ port: process.env.PORT, host: process.env.HOST }, (err) => {
	if (err) console.log(err);
});
