const handlers = require("./handlers");
const schemas = require("./schemas")

const routes = [
	{
		method: "POST",
		url: "/chargeCode/applyCode",
		handler: handlers.sendCodeToQueue(fastify),
		schema: schemas.applyCodeSchema
	},
];

module.exports = (fastify, opts, done) => {
	routes.forEach((route) => {
		fastify.route(route);
	});

	done();
};
