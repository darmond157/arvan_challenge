async function createNewTransaction(fastify) {
	return async (req, res) => {
		const { chargeCodeId, value, walletId, userId } = req.body;
		await fastify.pg.query(
			"insert into transactions (userId,walletId,chargeCodeId,value) values ($1,$2,$3,$4)",
			[userId, walletId, chargeCodeId, value]
		);
	};
}

module.exports = { createNewTransaction };
