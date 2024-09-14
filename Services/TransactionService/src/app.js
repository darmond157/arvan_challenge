module.exports = (port, host) => {
	const fastify = require("fastify")({ logger: process.env.LOGGER });

	require("./src/plugins/rabbitmq.js")(fastify)
		.then(() => {
			require("./src/plugins/redis.js")(fastify);
			require("./src/plugins/postgres.js")(fastify);
		})
		.then(() => {
			require("./src/queues/consumers/chargeCodeConsumer.js")(fastify);
		})
		.catch((err) => {
			console.log(err);
		});

	fastify.register("./src/routes");

	fastify.listen({ port, host }, (err) => {
		if (err) console.log(err);
	});
};
