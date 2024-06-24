module.exports = (fastify) => {
	const applyCodeForWallet = require("../controllers/charge/codeApplier.js")(fastify);

	fastify.get("/applyCode", applyCodeForWallet);
};
