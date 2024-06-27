const {
	applyCode,
	codeUsersLog,
} = require("../controllers/chargeController.js");

module.exports = (fastify) => {
	fastify.get("/chargeCode/codeUsersLog/:code", codeUsersLog(fastify));
	fastify.post("/chargeCode/applyCode", applyCode(fastify));
};
