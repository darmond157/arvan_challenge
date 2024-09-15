async function createNewUserAndWallet(fastify) {
	return async (req, res) => {
		const { phoneNumber } = req.body;

		const userId = await createNewUser(phoneNumber);
		const walletId = await createNewWallet(userId);
        
		res.send({ userId, walletId });
	};
	async function createNewUser(phoneNumber) {
		const createNewUserQueryResult = await fastify.pg.query(
			"insert into users (phoneNumber) values ($1) returning id",
			[phoneNumber]
		);
		return createNewUserQueryResult.rows[0].id;
	}

	async function createNewWallet(userId) {
		const createNewWalletQueryResult = await fastify.pg.query(
			"insert into wallets (userId,balance) values ($1,0) returning id",
			[userId]
		);

		return createNewWalletQueryResult.rows[0].id;
	}
}

async function getUserAndWallet(fastify) {
	return async (req, res) => {
		const { phoneNumber } = req.params;

		const userId = await getUserId(phoneNumber);
		const walletId = await getWalletId(userId);

		res.send(userId, walletId);
	};
	async function getUserId(phoneNumber) {
		const selectUserQueryResult = await fastify.pg.query(
			"select id from users where phoneNumber=$1 and deleted_at is null",
			[phoneNumber]
		);
		return selectUserQueryResult.rows[0].id;
	}

	async function getWalletId(userId) {
		const selectWalletQueryResult = await fastify.pg.query(
			"select id from wallets where userId=$1 and deleted_at is null",
			[userId]
		);
		return selectWalletQueryResult.rows[0].id;
	}
}

module.exports = { createNewUserAndWallet, getUserAndWallet };
