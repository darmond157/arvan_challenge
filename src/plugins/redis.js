module.exports = (fastify) => {
	return new Promise((res, rej) => {
		fastify.register(require("@fastify/redis"), { url: process.env.REDIS_URL });
		fastify.after((err) => {
			if (err) rej(err);
			res();
		});
	});
};
