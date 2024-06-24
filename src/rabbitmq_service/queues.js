module.exports = (fastify) => {
	chargeCodesQueue(fastify)
};

async function chargeCodesQueue(fastify) {
	const channel = fastify.amqp.channel;
	await channel.assertQueue("charge-codes-Q", { durable: true });
}