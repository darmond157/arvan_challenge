let fastify;

const getTransaction = require("../controllers/transaction/getTransaction.js")(
	fastify
);
const createTransaction =
	require("../controllers/transaction/createTransaction.js")(fastify);

module.exports = (fastifyInstance) => {
	fastify = fastifyInstance;

	fastify.get("/transactions", getTransaction.getAllTransactions);
	fastify.get("/transaction/:phoneNumber", getTransaction.getSingleTransaction);
	fastify.post("/transaction", createTransaction);
};
