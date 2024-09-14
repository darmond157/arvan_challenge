module.exports = (port, host) => {
	const fastify = require("fastify")({ logger: process.env.LOGGER });

	require("./src/plugins/rabbitmq")(fastify)
		.then(() => {
			require("./src/plugins/redis")(fastify);
			require("./src/plugins/postgres")(fastify);
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
