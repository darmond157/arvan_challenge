const handlers = require("./handlers");
const schemas = require("./schemas");

const routes = [
	{
		method: "POST",
		url: "/",
		handler: handlers.createNewTransaction(fastify),
		schema: schemas.createNewTransactionSchema,
	},
];

module.exports = (fastify, opts, done) => {
	routes.forEach((route) => {
		fastify.route(route);
	});

	done();
};
