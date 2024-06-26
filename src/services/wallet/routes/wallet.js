const { getWallet } = require("../controllers/walletController.js");

module.exports = (fastify) => {
	fastify.get("/wallet/:phoneNumber", getWallet(fastify));
};
