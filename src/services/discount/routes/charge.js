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

		const codeCountInDb = doesCodeExistsInDb(wholeArguments);
		if (!codeCountInDb) return res.send("the code does not exists!");

		if (getNumberOfCodeUsers(wholeArguments) == codeCountInDb)
			return res.send("Code is not valid anymore!");

		let dataToSendToQueue;
		if (doesUserExists(wholeArguments)) {
			if (hasUserUsedCodeBefore(wholeArguments))
				return res.send("you have used this code before!");

			const { userId, walletId } = getUserIdAndWalletId(wholeArguments);
			dataToSendToQueue = { userId, walletId, phoneNumber, code };
		} else {
			const { userId, walletId } = createNewUserAndWallet(wholeArguments);
			dataToSendToQueue = { userId, walletId, phoneNumber, code };
		}

		sendDataToChargeCodesQueue(fastify, dataToSendToQueue);
	});
};
