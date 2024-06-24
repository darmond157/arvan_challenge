module.exports = (fastify) => {
	let consumedMessage, rawData;
	const channel = fastify.amqp.channel;
	channel.consume("logs-Q", (msg) => {
		consumedMessage = msg;
		rawData = JSON.parse(msg.content.toString());
		const formatedData = applyFormaters(rawData, formaters);
		handleLog(fastify, formatedData).catch(async () => {
			await handleDeadLetter(consumedMessage, rawData, channel);
		});
		channel.ack(consumedMessage);
	});
};


// await channel.sendToQueue(
// 	"dead-letters-Q",
// 	Buffer.from(JSON.stringify(consumedMessage))
// );