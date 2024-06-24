module.exports = (fastify) => {
	return (req, res) => {
		const phoneNumber = req.body.phoneNumber;

		fastify.pg.query(getCreateWalletQuery(), [phoneNumber], (err, result) => {
			res.send("Please Try Again ..." || result);
			console.log(err);
		});
	};
};

function getCreateWalletQuery() {
	return "INSERT INTO wallets (phoneNumber,balance) VALUES ($1,0)";
}
