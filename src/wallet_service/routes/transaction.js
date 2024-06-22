let fastify;

const getTransaction = require("../controllers/transaction/getTransaction.js")(
	fastify
);
const createTransaction =
	require("../controllers/transaction/createTransaction.js")(fastify);
const updateTransaction =
	require("../controllers/transaction/updateTransaction.js")(fastify);
const deleteTransaction =
	require("../controllers/transaction/deleteTransaction.js")(fastify);

module.exports = (fastifyInstance) => {
	fastify = fastifyInstance;

	fastify.get("/transactions", getTransaction.getAllTransactions);
	fastify.get("/transaction/:phoneNumber", getTransaction.getSingleTransaction);
	fastify.post("/transaction", createTransaction);
	fastify.patch("/transaction/:phoneNumber", updateTransaction);
	fastify.delete("/transaction/:phoneNumber", deleteTransaction);
};
