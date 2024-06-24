module.exports = async (fastify) => {
	const channel = fastify.amqp.channel;
	await channel.assertQueue("charge-codes-Q", { durable: true });
};