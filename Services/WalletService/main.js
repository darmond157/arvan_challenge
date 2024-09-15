require("dotenv").config();

const fastify = require("fastify")({ logger: process.env.LOGGER });

require("./src/plugins/postgres")(fastify);

fastify.register(require("./src/routes"));

fastify.listen({ port: process.env.PORT, host: process.env.HOST }, (err) => {
	if (err) process.exit(0);
});
