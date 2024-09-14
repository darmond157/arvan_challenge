module.exports = (fastify) => {
	return new Promise(async (res, rej) => {
		fastify.register(require("fastify-amqp-async"), {
			connectionString: process.env.RABBITMQ_URL,
			useConfirmChannel: false,
			useRegularChannel: true,
		});

		await channel.assertQueue("charge-codes-Q", { durable: true });

		fastify.after((err) => {
			if (err) return rej(err);

			console.log("connected to rabbit ...");
			return res();
		});
	});
};
