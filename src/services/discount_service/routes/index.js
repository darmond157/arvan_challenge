let fastify;

const getDiscounts = require("../controllers/getWallet.js")(fastify);
const getDiscount = require("../controllers/createWallet.js")(fastify);
const createDiscount = require("../controllers/updateWallet.js")(fastify);
const updateDiscount = require("../controllers/deleteWallet.js")(fastify);
const deleteDiscount = require("../controllers/deleteWallet.js")(fastify);
const applyDiscountForWallet = require("../controllers/deleteWallet.js")(fastify);

module.exports = (fastifyInstance) => {
	fastify = fastifyInstance;

	fastify.get("/applyCode", applyDiscountForWallet);
};
