module.exports = (fastify) => {
	fastify.register(require("@fastify/postgres"), {
		connectionString: process.env.POSTGRES_URL,
	});
};
