module.exports = (fastify) => {
	initChargeCodesQueue(fastify);
};

async function initChargeCodesQueue(fastify) {
	const channel = fastify.amqp.channel;
	await channel.assertQueue("charge-codes-Q", { durable: true });
}
