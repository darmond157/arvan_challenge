require("dotenv").config();
const fastify = require("fastify")({ logger: true });

require("./src/plugins/postgres.js")(fastify)
	.then(() => {
		require("./src/plugins/rabbitmq.js")(fastify);
		require("./src/plugins/redis.js")(fastify);
	})
	.then(() => {
		require("./src/services/discount/main.js")(fastify);
		require("./src/services/wallet/main.js")(fastify);
	})
	.catch((err) => {
		console.log(err);
	});

fastify.listen({ port: process.env.PORT, host: process.env.HOST }, (err) => {
	if (err) console.log(err);
});
