const {db, buildUpdateQuery2, buildInsertQuery} = require('../../../helper/database');

const allData = async () => {

	let sql = `
		SELECT
			*
		FROM
			insurance
		WHERE
			active = 1
	`;

	try {
		let result = await db.any(sql);
		return result;
	}

	catch(err) {
		console.log(sql)
		return false;
	}
}

const dataById = async (id) => {

	let sql = `
		SELECT
			*
		FROM
			insurance
		WHERE id = '${id}'
	`;

	try {
		let result = await db.one(sql);
		return result;
	}

	catch(err) {
		console.log(sql)
		return false;
	}
}

const insertInsurance = async (data) => {
	try {

		let result  = await db.any(
			buildInsertQuery('insurance', data)
		);

		return result;
	}
	catch(err) {
		console.log('insertGift :'+err);
		return false;
	}
}

const updateInsurance = async (data) => {
	try {
		await db.tx(async t => {
			await t.any(
				buildUpdateQuery2('insurance', data.dataUpdate, data.where, 'active')
			);
		  
		});

		return true;
	}
	catch (err) {
		console.log(err);
		return false;
	}
}

module.exports = {
	allData,
	dataById,
	insertInsurance,
	updateInsurance
};