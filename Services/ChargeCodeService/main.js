require("dotenv").config();

const fastify = require("fastify")({ logger: process.env.LOGGER });

require("./src/plugins/rabbitmq")(fastify);
require("./src/plugins/redis")(fastify);
require("./src/plugins/postgres")(fastify);

fastify.ready().then(
	() => {
		require("./src/consumer.js")(fastify);
	},
	(err) => {
		console.log(err);
		process.exit(0);
	}
);

fastify.register(require("./src/routes"));

fastify.listen({ port: process.env.PORT, host: process.env.HOST }, (err) => {
	if (err) process.exit(0);
});
