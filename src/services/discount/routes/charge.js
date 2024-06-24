module.exports = (fastify) => {
	fastify.post("/applyCode", async (req, res) => {
		const phoneNumber = req.body?.phoneNumber;
		const code = req.body?.code;

		if (!phoneNumber || !code) return res.send("phoneNumber or code is empty!");

		const userUsedCodeResult = await fastify.redis.sismember(code, phoneNumber);

		if (userUsedCodeResult) return res.send("you have used this code before!");

		const codeCountResult = await fastify.pg.query(
			"select count from chargeCodes where code=$1",
			[code]
		);

		const doesCodeExistsInRedis = await fastify.redis.exists(code);
		if (!doesCodeExistsInRedis) {
			if (codeCountResult.rowCount != 0)
				await fastify.redis.set(code, codeCountResult);

			return res.send("The provided code does not exists!");
		}

		await fastify.redis.set(code,200)
		const isAnyAmountOfTheCodeLeft = await fastify.redis.get(code);
		if (!isAnyAmountOfTheCodeLeft) return res.send("Code is not valid anymore");

		const channel = fastify.amqp.channel;
		await channel.sendToQueue(
			"charge-code-Q",
			Buffer.from(JSON.stringify({ phoneNumber, code }))
		);
	});
};
