module.exports = (fastify) => {
	return new Promise((res, rej) => {
		fastify
			.register(require("@fastify/redis"), { url: process.env.REDIS_URL })
			.after((err) => {
				if (err) rej(err);
				
				console.log("connected to redis ...");
				return res();
			});
	});
};
