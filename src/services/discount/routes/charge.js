const {
	createNewUserAndWallet,
	getUserIdAndWalletId,
	hasUserUsedCodeBefore,
	doesUserExists,
	isFieldsProvided,
	doesCodeExistsInDb,
	getNumberOfCodeUsers,
	sendDataToChargeCodesQueue,
} = require("../../../utils.js");

module.exports = (fastify) => {
	fastify.post("/applyCode", async (req, res) => {
		const { phoneNumber, code } = req.body;
		const wholeArguments = { phoneNumber, code, fastify };

		if (!isFieldsProvided(wholeArguments))
			return res.send("phoneNumber or code is empty!");

		const codeCountInDb = await doesCodeExistsInDb(wholeArguments);
		if (!codeCountInDb) return res.send("the code does not exists!");

		if ((await getNumberOfCodeUsers(wholeArguments)) == codeCountInDb)
			return res.send("Code is not valid anymore!");

		let dataToSendToQueue;
		if (await doesUserExists(wholeArguments)) {
			if (await hasUserUsedCodeBefore(fastify, code, phoneNumber))
				return res.send("you have used this code before!");

			const { userId, walletId } = await getUserIdAndWalletId(wholeArguments);
			dataToSendToQueue = { userId, walletId, phoneNumber, code };
		} else {
			const { userId, walletId } = await createNewUserAndWallet(wholeArguments);
			dataToSendToQueue = { userId, walletId, phoneNumber, code };
		}

		await sendDataToChargeCodesQueue(fastify, dataToSendToQueue);
	});
};
