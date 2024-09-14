function getTransaction(fastify) {
	return async (req, res) => {
		const phoneNumber = req.params?.phoneNumber;
		const result = await fastify.pg.query(
			"select transactions.id,userid, walletid,phonenumber, discountcodeid, chargecodeid, value, transactions.created_at from transactions join users on transactions.userId=users.id where users.phoneNumber=$1 and users.deleted_at is null",
			[phoneNumber]
		);
		res.send(result.rows);
	};
}

module.exports = { getTransaction };
