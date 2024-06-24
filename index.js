const fastify = require("fastify")({ logger: true });

// Logic

// fastify.register(require("@fastify/autoload"), {
// 	dir: path.join(__dirname, 'routes')
//   })
//   await fastify.ready()
//   fastify.swagger()

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
	if (err) console.log(err);
});
