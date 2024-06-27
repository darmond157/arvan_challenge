const { getTransaction } = require("../controllers/transactionController.js");

module.exports = (fastify) => {
	fastify.get("/transactions/:phoneNumber", getTransaction(fastify));
};