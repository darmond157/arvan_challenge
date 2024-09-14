const axios = require("axios");

async function createNewUserAndWallet() {
	axios.post
}

async function getUserIdAndWalletId() {}

async function hasUserUsedCodeBefore({ fastify, code, phoneNumber }) {
	return await fastify.redis.sismember(code, phoneNumber);
}

async function doesUserExists({ fastify, phoneNumber }) {
	const result = await fastify.pg.query(
		"select * from users where phoneNumber=$1 and deleted_at is null",
		[phoneNumber]
	);
	return result.rowCount != 0;
}

async function doesCodeExistsInDb({ fastify, code }) {
	const result = await fastify.pg.query(
		"select * from chargeCodes where code=$1 and deleted_at is null",
		[code]
	);
	return result.rowCount;
}

async function getCodeCountInDb({ fastify, code }) {
	const result = await fastify.pg.query(
		"select count from chargeCodes where code=$1 and deleted_at is null",
		[code]
	);
	return result.rows[0].count;
}

async function getNumberOfCodeUsers({ fastify, code }) {
	return await fastify.redis.scard(code);
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
		"select id as chargeCodeId,value from chargeCodes where code=$1 and deleted_at is null",
		[code]
	);
	return {
		chargeCodeId: result.rows[0].chargecodeid,
		value: result.rows[0].value,
	};
}

async function createNewTransaction() {}

async function updateUserBalance() {}

async function addUserToRedis({ fastify, code, phoneNumber }) {
	await fastify.redis.sadd(code, phoneNumber);
}

module.exports = {
	createNewUserAndWallet,
	getUserIdAndWalletId,
	hasUserUsedCodeBefore,
	doesUserExists,
	doesCodeExistsInDb,
	getNumberOfCodeUsers,
	sendDataToChargeCodesQueue,
	parseQueueMessage,
	removeMessageFromChannel,
	getChargeCodeDetails,
	createNewTransaction,
	updateUserBalance,
	addUserToRedis,
	getCodeCountInDb,
};
