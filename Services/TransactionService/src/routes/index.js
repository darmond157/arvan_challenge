const chargeCodeRoutes = require("./chargeCode");
const transactionRoutes = require("./transaction");
const walletRoutes = require("./wallet");

module.exports = (fastify, opts, done) => {
	chargeCodeRoutes.forEach((route) => {
		fastify.route(route);
	});
	transactionRoutes.forEach((route) => {
		fastify.route(route);
	});
	walletRoutes.forEach((route) => {
		fastify.route(route);
	});
	done();
};
