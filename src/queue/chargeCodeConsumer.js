const {
	parseQueueMessage,
	getChargeCodeDetails,
	hasUserUsedCodeBefore,
	createNewTransaction,
	updateUserBalance,
	addUserToRedis,
	removeMessageFromChannel,
} = require("../utils.js");

module.exports = (fastify) => {
	const channel = fastify.amqp.channel;

	channel.consume("charge-codes-Q", async (message) => {
		const { code, phoneNumber, walletId, userId } = parseQueueMessage(message);

		if (hasUserUsedCodeBefore(fastify, code, phoneNumber))
			return console.log("The code has been used before!");

		const { chargeCodeId, value } = getChargeCodeDetails(fastify, code);
		createNewTransaction(fastify, chargeCodeId, value, walletId, userId);
		updateUserBalance(wholeData, codeValue);
		addUserToRedis(wholeData);

		removeMessageFromChannel(channel, message);
	});
};
