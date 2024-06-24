module.exports = (fastify) => {
	return new Promise((res, rej) => {
		fastify.register(require("fastify-amqp-async"), {
			connectionString: process.env.RABBITMQ_URL,
			useConfirmChannel: false,
			useRegularChannel: true,
		});
		fastify.after((err) => {
			if (err) rej(err);
			res();
		});
	});
};
