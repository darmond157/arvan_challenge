let fastify;

const getWallet = require("../controllers/wallet/getWallet.js")(fastify);
const createWallet = require("../controllers/wallet/createWallet.js")(fastify);
const updateWallet = require("../controllers/wallet/updateWallet.js")(fastify);

module.exports = (fastifyInstance) => {
	fastify = fastifyInstance;

	fastify.get("/wallets", getWallet.getAllWallets);
	fastify.get("/wallet/:phoneNumber", getWallet.getSingleWallet);
	fastify.post("/wallet", createWallet);
	fastify.patch("/wallet/:phoneNumber", updateWallet);
};
