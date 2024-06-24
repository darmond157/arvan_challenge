module.exports = (fastify) => {
	const channel = fastify.amqp.channel;
	channel.consume("charge-code-Q", (msg) => {
		let consumedMessage = JSON.parse(msg.content.toString());
		console.log(consumedMessage);
		// channel.ack(consumedMessage);

		//TODO:
		//create transaction
		//update user balance
		//decrease code count
	});		
};