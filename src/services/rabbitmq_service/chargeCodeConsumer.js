module.exports = (fastify) => {
	const channel = fastify.amqp.channel;
	channel.consume("charge-code-Q", (msg) => {
		let consumedMessage = JSON.parse(msg.content.toString());
		console.log(consumedMessage);
		// channel.ack(consumedMessage);
	});
};

// await channel.sendToQueue(
// 	"dead-letters-Q",
// 	Buffer.from(JSON.stringify(consumedMessage))
// );
