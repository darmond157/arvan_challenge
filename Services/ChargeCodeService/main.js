require("dotenv").config();

const fastify = require("fastify")({ logger: process.env.LOGGER });

require("./src/plugins/rabbitmq.js")(fastify)
	.then(() => {
		require("./src/plugins/redis.js")(fastify);
		require("./src/plugins/postgres.js")(fastify);
	})
	.then(() => {
		require("./src/consumer.js")(fastify);
	})
	.catch((err) => {
		console.log(err);
	});

fastify.register("./routes");

fastify.listen({ port: process.env.PORT, host: process.env.HOST }, (err) => {
	if (err) console.log(err);
});
