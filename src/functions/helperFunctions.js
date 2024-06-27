async function createNewUser(fastify, phoneNumber) {
	const createNewUserQueryResult = await fastify.pg.query(
		"insert into users (phoneNumber) values ($1) returning id",
		[phoneNumber]
	);
	return createNewUserQueryResult.rows[0].id;
}

async function createNewWallet(fastify, userId) {
	const createNewWalletQueryResult = await fastify.pg.query(
		"insert into wallets (userId,balance) values ($1,0) returning id",
		[userId]
	);

	return createNewWalletQueryResult.rows[0].id;
}

async function getUserId(fastify, phoneNumber) {
	const selectUserQueryResult = await fastify.pg.query(
		"select id from users where phoneNumber=$1 and deleted_at is null",
		[phoneNumber]
	);
	return selectUserQueryResult.rows[0].id;
}

async function getWalletId(fastify, userId) {
	const selectWalletQueryResult = await fastify.pg.query(
		"select id from wallets where userId=$1 and deleted_at is null",
		[userId]
	);
	return selectWalletQueryResult.rows[0].id;
}

module.exports = { createNewUser, createNewWallet, getUserId, getWalletId };
