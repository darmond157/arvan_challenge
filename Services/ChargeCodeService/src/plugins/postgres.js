module.exports = (fastify) => {
	fastify
		.register(require("@fastify/postgres"), {
			connectionString: process.env.POSTGRES_URL,
		})
		.after((err) => {
			if (err) process.exit(0);

			console.log("connected to postgres ...");
		});
};
