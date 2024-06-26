function getWallet(fastify) {
	return async (req, res) => {
		const walletId = req.params.phoneNumber;

		fastify.pg.query(getSelectWalletQuery(), [walletId], (err, result) => {
			if (err) return res.send(err);
			if (result.rowCount === 0)
				return res.send("There is not wallet with this phoneNumber!");
			res.send(result.rows[0]);
		});
	};
}

function getSelectWalletQuery() {
	return "SELECT userId,balance FROM wallets join users on wallets.userId=users.id WHERE users.phoneNumber=$1";
}

module.exports = { getWallet };
