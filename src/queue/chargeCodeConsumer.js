module.exports = (fastify) => {
	const channel = fastify.amqp.channel;

	channel.consume("charge-codes-Q", async (message) => {
		const { phoneNumber, code } = JSON.parse(message.content.toString());

		const userUsedCodeResult = await fastify.redis.sismember(code, phoneNumber);
		if (userUsedCodeResult)
			return console.log("The code has been used before!");

		channel.ack(message);
	});

	//TODO:
	//create transaction
	//update user balance
	//decrease code count
};
