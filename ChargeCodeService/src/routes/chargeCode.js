const handler = require("../services/discount/controllers/chargeController.js");

module.exports = [
	{
		method: "GET",
		url: "/chargeCode/codeUsersLog/:code",
		handler: handler.codeUsersLog(fastify),
	},
	{
		method: "POST",
		url: "/chargeCode/applyCode",
		handler: handler.applyCode(fastify),
	},
];
