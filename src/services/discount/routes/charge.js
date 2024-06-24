let fastify;

const applyCodeForWallet = require("../controllers/charge/codeApplier.js")(fastify);

module.exports = (fastifyInstance) => {
	fastify = fastifyInstance;
	fastify.get("/applyCode", applyCodeForWallet);
};
