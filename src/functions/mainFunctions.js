const {
	createNewUser,
	createNewWallet,
	getUserId,
	getWalletId,
} = require("./helperFunctions");

async function createNewUserAndWallet({ fastify, phoneNumber }) {
	const userId = await createNewUser(fastify, phoneNumber);
	const walletId = await createNewWallet(fastify, userId);

	return { walletId, userId };
}

async function getUserIdAndWalletId({ fastify, phoneNumber }) {
	const userId = await getUserId(fastify, phoneNumber);
	const walletId = await getWalletId(fastify, userId);

	return { userId, walletId };
}

async function hasUserUsedCodeBefore(fastify, code, phoneNumber) {
	const result = await fastify.redis.sismember(code, phoneNumber);
	return result ? true : false;
}

async function doesUserExists({ fastify, phoneNumber }) {
	const result = await fastify.pg.query(
		"select * from users where phoneNumber=$1",
		[phoneNumber]
	);
	return result.rowCount != 0 ? true : false;
}

function isFieldsProvided({ phoneNumber, code }) {
	return phoneNumber && code;
}

async function doesCodeExistsInDb({ fastify, code }) {
	const result = await fastify.pg.query(
		"select * from chargeCodes where code=$1",
		[code]
	);
	return result.rowCount;
}

async function getNumberOfCodeUsers({ fastify, code }) {
	await fastify.redis.scard(code);
}

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

async function getChargeCodeDetails(fastify, code) {
	const result = await fastify.pg.query(
		"select id as chargeCodeId,value from chargeCodes where code=$1",
		[code]
	);
	return {
		chargeCodeId: result.rows[0].chargecodeid,
		value: result.rows[0].value,
	};
}

async function createNewTransaction({
	fastify,
	chargeCodeId,
	value,
	walletId,
	userId,
}) {
	await fastify.pg.query(
		"insert into transactions (userId,walletId,chargeCodeId,value) values ($1,$2,$3,$4)",
		[userId, walletId, chargeCodeId, value]
	);
}
async function updateUserBalance({ fastify, walletId, value }) {
	await fastify.pg.query("update wallets set balance=balance+$1 where id=$2", [
		value,
		walletId,
	]);
}
async function addUserToRedis({ fastify, code, phoneNumber }) {
	await fastify.redis.sadd(code, phoneNumber);
}

function checkPhoneNumberFormat(phoneNumber) {
	return phoneNumber.length <= 20;
}

module.exports = {
	createNewUserAndWallet,
	getUserIdAndWalletId,
	hasUserUsedCodeBefore,
	doesUserExists,
	isFieldsProvided,
	doesCodeExistsInDb,
	getNumberOfCodeUsers,
	sendDataToChargeCodesQueue,
	parseQueueMessage,
	removeMessageFromChannel,
	getChargeCodeDetails,
	createNewTransaction,
	updateUserBalance,
	addUserToRedis,
	checkPhoneNumberFormat,
};
