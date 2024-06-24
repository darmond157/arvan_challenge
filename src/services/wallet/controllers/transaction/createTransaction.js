module.exports = (fastify) => {
	return (req, res) => {
		const transactionId = req.params.id;

		fastify.pg.query(getSelectTransactionQuery(), [transactionId], (err, result) => {
			res.send("Please Try Again ..." || result);
			console.log(err);
		});
	};
};
