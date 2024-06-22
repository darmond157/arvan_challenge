let fastify;

const getWallet = require("../controllers/getWallet.js")(fastify);
const createWallet = require("../controllers/createWallet.js")(fastify);
const updateWallet = require("../controllers/updateWallet.js")(fastify);
const deleteWallet = require("../controllers/deleteWallet.js")(fastify);

module.exports = (fastifyInstance) => {
	fastify = fastifyInstance;

	fastify.get("/wallets", getWallet.getAllWallets);
	fastify.get("/wallet/:phoneNumber", getWallet.getSingleWallet);
	fastify.post("/wallet", createWallet);
	fastify.patch("/wallet/:phoneNumber", updateWallet);
	fastify.delete("/wallet/:phoneNumber", deleteWallet);
};
