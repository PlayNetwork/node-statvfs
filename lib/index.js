// Copyright (c) 2012, Mark Cavage. All rights reserved.

var statvfs = require('../build/Release/statvfs').statvfs;

module.exports = function (path, callback) {
	// call statvfs
	let exec = new Promise(function (resolve, reject) {
		statvfs(path, function (err, stats) {
			if (err) {
				return reject(err);
			}

			return resolve(stats);
		});
	});

	// return the Promise when no callback is specified
	if (typeof callback === 'undefined') {
		return exec;
	}

	// handle when a callback is prsent
	return exec
		.then(function (stats) {
			return callback(null, stats);
		})
		.catch(function (err) {
			return callback(err);
		});
};
