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

		if (
			getNumberOfCodeUsers(wholeArguments) == doesCodeExistsInDb(wholeArguments)
		)
			return console.log("Code is not valid anymore!");

		const wholeDataObject = {
			code,
			phoneNumber,
			walletId,
			userId,
			...getChargeCodeDetails(fastify, code),
		};

		createNewTransaction(wholeDataObject);
		updateUserBalance(wholeDataObject);
		addUserToRedis(wholeDataObject);

		removeMessageFromChannel(channel, message);
	});
};
