const { getTransaction } = require("../controllers/transactionController.js");

module.exports = (fastify) => {
	fastify.get("/transaction/:phoneNumber", getTransaction(fastify));
};