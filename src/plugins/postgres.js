module.exports = (fastify) => {
	return new Promise((res, rej) => {
		fastify
			.register(require("@fastify/postgres"), {
				connectionString: process.env.POSTGRES_URL,
			})
			.after((err) => {
				if (err) rej(err);

				console.log("connected to postgres ...");
				res();
			});
	});
};
