const {
	createNewUserAndWallet,
	getUserIdAndWalletId,
	hasUserUsedCodeBefore,
	doesUserExists,
	doesCodeExistsInDb,
	getCodeCountInDb,
	getNumberOfCodeUsers,
	sendDataToChargeCodesQueue,
} = require("../utils/postgres.js");

function sendCodeToQueue(fastify) {
	return async (req, res) => {
		const wholeArguments = { ...req.body, fastify };

		const doesCodeExists = await doesCodeExistsInDb(wholeArguments);
		if (!doesCodeExists) return res.send("the code does not exists!");

		if (
			(await getNumberOfCodeUsers(wholeArguments)) >=
			(await getCodeCountInDb(wholeArguments))
		)
			return res.send("Code is not valid anymore!");

		const userExists = await doesUserExists(wholeArguments);
		if (userExists && (await hasUserUsedCodeBefore(wholeArguments)))
			return res.send("you have used this code before!");

		const { userId, walletId } = userExists
			? await getUserIdAndWalletId(req.body.phoneNumber)
			: await createNewUserAndWallet(req.body.phoneNumber);

		dataToSendToQueue = {
			userId,
			walletId,
			...req.body,
		};
		await sendDataToChargeCodesQueue(fastify, dataToSendToQueue);

		return res.send("your process has been started ...");
	};
}

module.exports = { sendCodeToQueue };
