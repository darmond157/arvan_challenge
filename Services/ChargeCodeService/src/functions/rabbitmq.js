async function sendDataToChargeCodesQueue(fastify, data) {
	await fastify.amqp.channel.sendToQueue(
		"charge-codes-Q",
		Buffer.from(JSON.stringify(data))
	);
}

function parseQueueMessage(message) {
	return JSON.parse(message.content.toString());
}

function removeMessageFromChannel(channel, message) {
	channel.ack(message);
}

module.exports = {
	sendDataToChargeCodesQueue,
	parseQueueMessage,
	removeMessageFromChannel,
};
