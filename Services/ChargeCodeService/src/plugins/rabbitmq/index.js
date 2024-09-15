module.exports = async (fastify) => {
	fastify.register(require("fastify-amqp-async"), {
		connectionString: process.env.RABBITMQ_URL,
		useConfirmChannel: false,
		useRegularChannel: true,
	});

	fastify.after((err) => {
		if (err) process.exit(0);

		console.log("connected to rabbitmq ...");
	});

	const channel = fastify.amqp.channel;
	await channel.assertQueue("charge-codes-Q", { durable: true });
};
