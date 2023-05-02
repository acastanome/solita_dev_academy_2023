const csv = require('csv-parser');
const fs = require('fs');

const getStationsFromFile = (filename) => {
	return new Promise((resolve, reject) => {
		const results = [];

		fs.createReadStream(filename)
			.pipe(csv())
			.on('data', (data) => {
				results.push(data);
			})
			.on('error', (e) => reject(e))
			.on('end', () => resolve(results));
	});
};

module.exports = { getStationsFromFile };
