module.exports = async (fastify) => {
	await fastify.register(require("@fastify/postgres"), {
		connectionString: process.env.POSTGRES_URL,
	});
};
