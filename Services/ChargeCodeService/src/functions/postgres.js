async function doesUserExists({ fastify, phoneNumber }) {
	const result = await fastify.pg.query(
		"select * from users where phoneNumber=$1 and deleted_at is null",
		[phoneNumber]
	);
	return result.rowCount != 0;
}

async function doesCodeExistsInDb({ fastify, code }) {
	const result = await fastify.pg.query(
		"select * from chargeCodes where code=$1 and deleted_at is null",
		[code]
	);
	return result.rowCount;
}

async function getCodeCountInDb({ fastify, code }) {
	const result = await fastify.pg.query(
		"select count from chargeCodes where code=$1 and deleted_at is null",
		[code]
	);
	return result.rows[0].count;
}

async function getChargeCodeDetails(fastify, code) {
	const result = await fastify.pg.query(
		"select id as chargeCodeId,value from chargeCodes where code=$1 and deleted_at is null",
		[code]
	);
	return {
		chargeCodeId: result.rows[0].chargecodeid,
		value: result.rows[0].value,
	};
}

module.exports = {
	doesUserExists,
	doesCodeExistsInDb,
	getChargeCodeDetails,
	getCodeCountInDb,
};
