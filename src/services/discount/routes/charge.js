const { applyCode, codeUsersLog } = require("../controllers/chargeController.js");

module.exports = (fastify) => {
	fastify.get("/codeUsersLog/:code",codeUsersLog(fastify))
	fastify.post("/applyCode", applyCode(fastify));
};
