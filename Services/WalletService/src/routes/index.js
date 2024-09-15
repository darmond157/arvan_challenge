const handlers = require("./handlers");
const schemas = require("./schemas");

const routes = [
	{
		method: "POST",
		url: "/",
		handler: handlers.createNewUserAndWallet(fastify),
		schema: schemas.createNewUserAndWalletSchema,
	},
	{
		method: "get",
		url: "/:phoneNumber",
		handler: handlers.getUserAndWallet(fastify),
		schema: schemas.getUserAndWalletSchema,
	},
];

module.exports = (fastify, opts, done) => {
	routes.forEach((route) => {
		fastify.route(route);
	});

	done();
};
