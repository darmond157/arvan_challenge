let fastify;

const getWallet = require("../controllers/wallet/getWallet.js")(fastify);
const createWallet = require("../controllers/wallet/createWallet.js")(fastify);

module.exports = (fastifyInstance) => {
	fastify = fastifyInstance;

	fastify.get("/wallet/:phoneNumber", getWallet);
	fastify.post("/wallet", createWallet);
};
