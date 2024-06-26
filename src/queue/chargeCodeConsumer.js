const {
	parseQueueMessage,
	getChargeCodeDetails,
	hasUserUsedCodeBefore,
	createNewTransaction,
	updateUserBalance,
	addUserToRedis,
	removeMessageFromChannel,
	getNumberOfCodeUsers,
	doesCodeExistsInDb,
} = require("../utils.js");

module.exports = (fastify) => {
	const channel = fastify.amqp.channel;

	channel.consume("charge-codes-Q", async (message) => {
		const { code, phoneNumber, walletId, userId } = parseQueueMessage(message);

		const wholeDataObject = {
			fastify,
			code,
			phoneNumber,
			walletId,
			userId,
			...getChargeCodeDetails(fastify, code),
		};

		if (await hasUserUsedCodeBefore(fastify, code, phoneNumber))
			return console.log("The code has been used before!");

		if (
			(await getNumberOfCodeUsers(wholeDataObject)) ==
			(await doesCodeExistsInDb(wholeDataObject))
		)
			return console.log("Code is not valid anymore!");

		createNewTransaction(wholeDataObject);
		updateUserBalance(wholeDataObject);
		addUserToRedis(wholeDataObject);

		removeMessageFromChannel(channel, message);
	});
};
