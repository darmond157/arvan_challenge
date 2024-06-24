module.exports = async (fastify) => {
	await fastify.register(require("@fastify/mysql"), {
		connectionString: process.env.MYSQL_URL,
	});
};
