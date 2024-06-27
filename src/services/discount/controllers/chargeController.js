const {
	createNewUserAndWallet,
	getUserIdAndWalletId,
	hasUserUsedCodeBefore,
	doesUserExists,
	isFieldsProvided,
	doesCodeExistsInDb,
	getNumberOfCodeUsers,
	sendDataToChargeCodesQueue,
	checkPhoneNumberFormat,
} = require("../../../functions/mainFunctions.js");

function applyCode(fastify) {
	return async (req, res) => {
		const { phoneNumber, code } = req.body;
		const wholeArguments = { phoneNumber, code, fastify };

		if (!checkPhoneNumberFormat(phoneNumber))
			return res.code(400).send("phoneNumber is invalid!");

		if (!isFieldsProvided(wholeArguments))
			return res.code(400).send("phoneNumber or code is empty!");

		const codeCountInDb = await doesCodeExistsInDb(wholeArguments);
		if (!codeCountInDb) return res.code(500).send("the code does not exists!");

		if ((await getNumberOfCodeUsers(wholeArguments)) >= codeCountInDb)
			return res.code(500).send("Code is not valid anymore!");

		let dataToSendToQueue;
		if (await doesUserExists(wholeArguments)) {
			if (await hasUserUsedCodeBefore(fastify, code, phoneNumber))
				return res.code(500).send("you have used this code before!");

			const { userId, walletId } = await getUserIdAndWalletId(wholeArguments);
			dataToSendToQueue = { userId, walletId, phoneNumber, code };
		} else {
			const { userId, walletId } = await createNewUserAndWallet(wholeArguments);
			dataToSendToQueue = { userId, walletId, phoneNumber, code };
		}

		await sendDataToChargeCodesQueue(fastify, dataToSendToQueue);

		return res.send("your process has been started ...");
	};
}

function codeUsersLog(fastify) {
	return async (req, res) => {
		const code = req.params?.code;
		const usersLogs = await fastify.redis.smembers(code);
		res.send(usersLogs);
	};
}

module.exports = { applyCode, codeUsersLog };
