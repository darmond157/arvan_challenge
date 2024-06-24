const { createClient } = require("redis");

module.exports = (fastify) => {
	return async (req, res) => {
		const phoneNumber = req.body?.phoneNumber;
		const code = req.body?.code;

		if (!phoneNumber || !code) return res.send("phoneNumber or code is empty!");

		const redisClient = createClient({
			url: process.env.REDIS_URL,
		});

		const userUsedCodeResult = await redisClient.SISMEMBER(code, phoneNumber);

		if (userUsedCodeResult) return res.send("you have used this code before!");

		const codeCountResult = await fastify.pg.query(
			"select count from chargeCodes where code=$1",
			[code]
		);

		(err, res) => {
			if (err) return res.send(err);
			if (!redisClient.EXISTS(code)) redisClient.SET(code, res);
		};

		if (redisClient.GET(code) == 0)
			return res.send("Code is not valid anymore");

		const channel = fastify.amqp.channel;
		await channel.sendToQueue(
			"charge-code-Q",
			Buffer.from(JSON.stringify({ phoneNumber, code }))
		);
	};
};
