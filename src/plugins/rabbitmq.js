module.exports = async (fastify) => {
	await fastify.register(require("fastify-amqp-async"), {
		connectionString: process.env.RABBITMQ_URL,
		useConfirmChannel: false,
		useRegularChannel: true,
	});
};
