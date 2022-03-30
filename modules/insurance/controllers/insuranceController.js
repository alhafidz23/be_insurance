const router            = require('express').Router();
const insuranceModel    = require('../models/insuranceModel');
const moment            = require('moment-timezone');
						  moment.tz('Asia/Jakarta').format();
const Joi               = require('@hapi/joi');
const {
	ValidationError,
	DatabaseError,
	AuthorizationError} = require('../../../helper/errorHandler');

router.get('/insurance', async(req, res, next) => {
	let response = { status:0, message: 'Success', data: null}

	let getData = await insuranceModel.allData();
	if(getData){
		response.data = getData
	}else{
		return next(new DatabaseError('Internal Error'));
	}

	return res.send(response)
});

router.get('/insurance/:id', async(req, res, next) => {
	let response = { status:0, message: 'Success', data: null}
	let id = req.params.id;
	let getData = await insuranceModel.dataById(id);

	if(getData){
		response.data = getData
	}else{
		response.status = 100;
		response.message = 'Data tidak ditemukan';
		return res.status(404).send(response)
	}

	return res.send(response)
});

router.post('/insurance', async(req, res, next) => {
	let response = { status:0, message: 'Success', data: null}
	
	let paramSchema = {
		name: Joi.string().required()
	}

	let { error } = Joi.validate(req.body, paramSchema);

	if (!error) {
		const reqBody = req.body

		const dataInsert = [{
			name: reqBody.name,
			active: 1
		}]

		const inserted = await insuranceModel.insertInsurance(dataInsert);
		if(inserted){
			response.data = dataInsert
		}else{
			return next(new DatabaseError('Internal Error'));
		}
	}else{
		return next(new ValidationError(error.details[0].message))
	}

	return res.send(response)
});

router.put('/insurance/:id', async(req, res, next) => {
	let response = { status:0, message: 'Success', data: null}
	let id = req.params.id;
	
	let paramSchema = {
		name: Joi.string().required()
	}

	let { error } = Joi.validate(req.body, paramSchema);

	if (!error) {
		let insurance = await insuranceModel.dataById(id);

		if(insurance){
			const reqBody = req.body

			const dataUpdate = {
				name: reqBody.name,
				updated_at: moment().format()
			}

			const dataClosing = {
				dataUpdate : dataUpdate,
				where : {
					id: id
				}
			};
	
			const updated = await insuranceModel.updateInsurance(dataClosing);
			if(!updated){
				return next(new DatabaseError('Internal Error'));
			}
		}else{
			response.status = 107
			response.message = 'Id Not Found'
			return res.status(404).send(response)
		}
	}else{
		return next(new ValidationError(error.details[0].message))
	}

	return res.send(response)
});

router.delete('/insurance/:id', async(req, res, next) => {
	let response = { status:0, message: 'Success', data: null}
	let id = req.params.id;
	let insurance = await insuranceModel.dataById(id);

	if(insurance){
		const dataUpdate = {
			active: 0,
			updated_at: moment().format()
		}

		const dataClosing = {
			dataUpdate : dataUpdate,
			where : {
				id: id
			}
		};

		const updated = await insuranceModel.updateInsurance(dataClosing);
		if(!updated){
			return next(new DatabaseError('Internal Error'));
		}
	}else{
		response.status = 107
		response.message = 'Id Not Found'
		return res.status(404).send(response)
	}

	return res.send(response)
});

module.exports = router