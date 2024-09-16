const handlers = require("./handlers");
const schemas = require("./schemas");

module.exports = (fastify, opts, done) => {
	const routes = [
		{
			method: "POST",
			url: "/",
			handler: handlers.createNewTransaction(fastify),
			schema: schemas.createNewTransactionSchema,
		},
	];

	routes.forEach((route) => {
		fastify.route(route);
	});

	done();
};
