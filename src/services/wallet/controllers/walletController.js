function getWallet(fastify) {
	return async (req, res) => {
		const phoneNumber = req.params?.phoneNumber;
		const result = await fastify.pg.query(
			"select wallets.id,userid,phonenumber,balance,wallets.created_at,wallets.updated_at from wallets join users on wallets.userId=users.id WHERE users.phoneNumber=$1 and wallets.deleted_at is null and users.deleted_at is null",
			[phoneNumber]
		);
		res.send(result.rows[0]);
	};
}

module.exports = { getWallet };
