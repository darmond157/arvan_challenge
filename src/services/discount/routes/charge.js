const { applyCode } = require("../controllers/chargeController.js");

module.exports = (fastify) => {
	fastify.post("/applyCode", applyCode(fastify));
};
