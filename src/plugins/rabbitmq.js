module.exports = (fastify) => {
	return new Promise((res, rej) => {
		fastify
			.register(require("fastify-amqp-async"), {
				connectionString: process.env.RABBITMQ_URL,
				useConfirmChannel: false,
				useRegularChannel: true,
			})
			.after((err) => {
				if (err) rej(err);
				
				console.log("connected to rabbit ...");
				res();
			});
	});
};
