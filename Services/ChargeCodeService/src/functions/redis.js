async function getNumberOfCodeUsers({ fastify, code }) {
	return await fastify.redis.scard(code);
}

async function addUserToRedis({ fastify, code, phoneNumber }) {
	await fastify.redis.sadd(code, phoneNumber);
}

async function hasUserUsedCodeBefore({ fastify, code, phoneNumber }) {
	return await fastify.redis.sismember(code, phoneNumber);
}

module.exports = {
	getNumberOfCodeUsers,
	hasUserUsedCodeBefore,
	addUserToRedis,
};
