const handler = require("../handlers/wallet/index.js");

module.exports = [
	{
		method: "GET",
		url: "/wallet/:phoneNumber",
		handler: handler.getWallet(fastify),
	},
];
