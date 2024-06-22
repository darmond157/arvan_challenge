const fastify = require("fastify")({ logger: true });

// Logic

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
	if (err) console.log(err);
});
