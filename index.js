let superagent = require('superagent')
let express = require('express')
let app = express()
let db = require('./db.js')
app.get('/api/', (req, res) => {
	res.send('init success')
});
app.get('/api/get', (req, res) => {
	let {
		city, bank
	} = req.query;
	if (!city && !bank) {
		res.send({
			errcode: 1,
			msg: 'request params missing'
		});
	} else {
		let query = {}
		if (city) {
			query.city = city
		}
		if (bank) {
			query.bank = bank
		}
		db.Bank.find(query, (err, doc) => {
			if (!err) {
				res.send({
					list: doc
				});
			} else {
				console.log(err)
			}
		})
	}
});
app.get('/api/getCity', (req, resp) => {
	let {lat,lng} = req.query
	let mapurl = 'http://apis.map.qq.com/ws/geocoder/v1/'
	superagent.get(mapurl)
	.query({
		location:`${lat},${lng}`,
		key : 'W3EBZ-7LZCJ-JURFW-FHSIY-CKBLH-RPF2J'
	})
	.end((err, res) => {
		resp.send(res.body.result.address_component)
	})
})
app.listen(3000);