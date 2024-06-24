let fastify;

const getTransaction = require("../controllers/transaction/getTransaction.js")(
	fastify
);
const createTransaction =
	require("../controllers/transaction/createTransaction.js")(fastify);

module.exports = (fastifyInstance) => {
	fastify = fastifyInstance;

	fastify.get("/transaction/:phoneNumber", getTransaction);
	fastify.post("/transaction", createTransaction);
};
