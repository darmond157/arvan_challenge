module.exports = (fastify) => {
	const getTransaction = require("../controllers/transaction/getTransaction.js")(
		fastify
	);
	const createTransaction =
		require("../controllers/transaction/createTransaction.js")(fastify);
	
	fastify.get("/transaction/:phoneNumber", getTransaction);
	fastify.post("/transaction", createTransaction);
};
