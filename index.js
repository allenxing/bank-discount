var express = require('express')
var app = express()
var db = require('./db.js')
app.get('/api/', function(req, res) {
	res.send('init success')
});
app.get('/api/get', function(req, res) {
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
					errcode: 0,
					msg: 'success',
					list: doc
				});
			} else {
				console.log(err)
			}
		})
	}
});
app.listen(3000);