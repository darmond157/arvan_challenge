
export async function createNewUserAndWallet({ fastify, phoneNumber }) {
	const createNewUserQueryResult = await fastify.pg.query(
		"insert into users (phoneNumber) values ($1) returning id",
		[phoneNumber]
	);
	const userId = createNewUserQueryResult.rows[0].id;

	const createNewWalletQueryResult = await fastify.pg.query(
		"insert into users (userId,balance) values ($1,0) returning id",
		[userId]
	);
	const walletId = createNewWalletQueryResult.rows[0].id;

	return { walletId, userId };
}

export async function getUserIdAndWalletId({ fastify, phoneNumber }) {
	const selectUserQueryResult = await fastify.pg.query(
		"select id from users where phoneNumber=$1",
		[phoneNumber]
	);
	const userId = selectUserQueryResult.rows[0].id;

	const selectWalletQueryResult = await fastify.pg.query(
		"select id from wallets where userId=$1",
		[userId]
	);
	const walletId = selectWalletQueryResult.rows[0].id;

	return { userId, walletId };
}

export async function hasUserUsedCodeBefore({ fastify, code, phoneNumber }) {
	return (await fastify.redis.sismember(code, phoneNumber)) != 0 ? true : false;
}

export async function doesUserExists({ fastify, phoneNumber }) {
	const result = await fastify.pg.query(
		"select * from users where phoneNumber=$1",
		[phoneNumber]
	);
	return result.rowCount != 0 ? true : false;
}

export function isFieldsProvided({ phoneNumber, code }) {
	return phoneNumber && code;
}

export async function doesCodeExistsInDb({ fastify, code }) {
	const result = await fastify.pg.query(
		"select * from chargeCodes where code=$1",
		[code]
	);
	return result.rowCount;
}

export async function getNumberOfCodeUsers({ fastify, code }) {
	await fastify.redis.scard(code);
}

export async function sendDataToChargeCodesQueue(fastify, data) {
	const channel = fastify.amqp.channel;
	await channel.sendToQueue(
		"charge-codes-Q",
		Buffer.from(JSON.stringify(data))
	);
}
