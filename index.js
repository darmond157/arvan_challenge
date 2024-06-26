require("dotenv").config();
const fastify = require("fastify")({ logger: process.env.LOGGER });

require("./src/plugins/rabbitmq.js")(fastify)
	.then(() => {
		require("./src/plugins/redis.js")(fastify);
		require("./src/plugins/postgres.js")(fastify);
	})
	.then(() => {
		require("./src/queue/queueInitializer.js")(fastify);
		require("./src/queue/chargeCodeConsumer.js")(fastify);
	})
	.catch((err) => {
		console.log(err);
	});

require("./src/services/discount/main.js")(fastify);
require("./src/services/wallet/main.js")(fastify);

fastify.listen({ port: process.env.PORT, host: process.env.HOST }, (err) => {
	if (err) console.log(err);
});
