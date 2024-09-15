const handlers = require("./handlers");
const schemas = require("./schemas");

module.exports = (fastify, opts, done) => {
	const routes = [
		{
			method: "POST",
			url: "/applyCode",
			handler: handlers.sendCodeToQueue(fastify),
			schema: schemas.applyCodeSchema,
		},
	];
	
	routes.forEach((route) => {
		fastify.route(route);
	});

	done();
};
