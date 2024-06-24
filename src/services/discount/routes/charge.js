module.exports = (fastify) => {
	fastify.post("/applyCode", async (req, res) => {
		const phoneNumber = req.body?.phoneNumber;
		const code = req.body?.code;

		if (!phoneNumber || !code) return res.send("phoneNumber or code is empty!");

		const userUsedCodeResult = await fastify.redis.sismember(
			code + "$users$",
			phoneNumber
		);

		if (userUsedCodeResult) return res.send("you have used this code before!");

		const codeCountResultFromDb = await fastify.pg.query(
			"select count from chargeCodes where code=$1",
			[code]
		);
		const codeCount = codeCountResultFromDb.rows[0].count;

		const doesCodeExistsInRedis = await fastify.redis.exists(code);

		if (!doesCodeExistsInRedis) {
			if (codeCount != 0) await fastify.redis.set(code, codeCount);
			else return res.send("The provided code does not exists!");
		}

		const isAnyAmountOfTheCodeLeft = await fastify.redis.get(code);
		if (!isAnyAmountOfTheCodeLeft) return res.send("Code is not valid anymore");

		const channel = fastify.amqp.channel;

		await channel.sendToQueue(
			"charge-codes-Q",
			Buffer.from(JSON.stringify({ phoneNumber, code }))
		);
	});
};
