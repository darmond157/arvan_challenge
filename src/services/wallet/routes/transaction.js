module.exports = (fastify) => {
	fastify.get("/transaction/:phoneNumber", (req, res) => {
		const transactionId = req.params.id;

		fastify.pg.query(
			getSelectTransactionQuery(),
			[transactionId],
			(err, result) => {
				res.send("Please Try Again ..." || result);
				console.log(err);
			}
		);
	});
};

function getSelectTransactionQuery() {
	return "SELECT * FROM wallets WHERE id=$1";
}
