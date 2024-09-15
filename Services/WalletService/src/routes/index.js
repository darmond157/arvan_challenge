const handlers = require("./handlers");
const schemas = require("./schemas");

module.exports = (fastify, opts, done) => {
	const routes = [
		{
			method: "POST",
			url: "/",
			handler: handlers.createNewUserAndWallet(fastify),
			schema: schemas.createNewUserAndWalletSchema,
		},
		{
			method: "GET",
			url: "/:phoneNumber",
			handler: handlers.getUserAndWallet(fastify),
			schema: schemas.getUserAndWalletSchema,
		},
	];

	routes.forEach((route) => {
		fastify.route(route);
	});

	done();
};
