module.exports = async (fastify) => {
    await fastify.register(require('@fastify/swagger'))
};
