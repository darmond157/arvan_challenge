function createNewTransaction(fastify) {
	return async (req, res) => {
		try {
			const { chargeCodeId, value, walletId, userId } = req.body;
			await fastify.pg.query(
				"insert into transactions (userId,walletId,chargeCodeId,value) values ($1,$2,$3,$4)",
				[userId, walletId, chargeCodeId, value]
			);
			res.send("ok");
		} catch (err) {
			process.exit(0);
		}
	};
}

module.exports = { createNewTransaction };
