module.exports = (fastify) => {
	try {
		const channel = fastify.amqp.channel;
		channel.consume("charge-codes-Q", async (message) => {
			const { code, phoneNumber, walletId, userId } =
				parseQueueMessage(message);
			const { chargeCodeId, value } = await getChargeCodeDetails(fastify, code);

			const wholeDataObject = {
				fastify,
				code,
				phoneNumber,
				walletId,
				userId,
				chargeCodeId,
				value,
			};

			if (await hasUserUsedCodeBefore(fastify, code, phoneNumber))
				return console.log("The code has been used before!");

			if (
				(await getNumberOfCodeUsers(wholeDataObject)) >=
				(await getCodeCountInDb(wholeDataObject))
			)
				return console.log("Code is not valid anymore!");

			createNewTransaction(wholeDataObject);
			updateUserBalance(wholeDataObject);
			addUserToRedis(wholeDataObject);

			removeMessageFromChannel(channel, message);
		});
	} catch (err) {
		console.log(err);

		process.exit(0);
	}
};
