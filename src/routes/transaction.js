const handler = require("../controllers/transactionController.js");

module.exports = [
	{
		method: "GET",
		url: "/transactions/:phoneNumber",
		handler: handler.getTransaction(fastify),
	},
];