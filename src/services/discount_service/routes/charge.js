let fastify;

const applyCodeForWallet = require("../controllers/codeApplier.js")(fastify);

module.exports = (fastifyInstance) => {
	fastify = fastifyInstance;
	fastify.get("/applyCode", applyCodeForWallet);
};
