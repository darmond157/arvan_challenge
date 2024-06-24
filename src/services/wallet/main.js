module.exports = (fastify) => {
	require("./routes/transaction.js")(fastify);
	require("./routes/wallet.js")(fastify);
};
