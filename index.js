require("dotenv").config();
const fastify = require("fastify")({ logger: true });

try {
	require("./src/plugins/mysql.js")(fastify);
	require("./src/plugins/rabbitmq.js")(fastify);
	require("./src/plugins/swagger.js")(fastify);
} catch (e) {
	console.log("error initializing external plugins:", e);
}

require("./src/services/discount/main.js")(fastify);
require("./src/services/wallet/main.js")(fastify);


fastify.listen({ port: process.env.PORT, host: process.env.HOST }, (err) => {
	if (err) console.log(err);
});
