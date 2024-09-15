module.exports = (fastify) => {
	fastify
		.register(require("@fastify/redis"), { url: process.env.REDIS_URL })
		.after((err) => {
			if (err) process.exit(0);

			console.log("connected to redis ...");
		});
};
