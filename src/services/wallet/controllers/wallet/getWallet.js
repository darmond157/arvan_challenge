module.exports = (fastify) => {
	return (req, res) => {
		const walletId = req.params.id;

		fastify.pg.query(getSelectWalletQuery(), [walletId], (err, result) => {
			res.send("Please Try Again ..." || result);
			console.log(result);
		});
	};
};

function getSelectWalletQuery() {
	return "SELECT * FROM wallets WHERE id=$1";
}
