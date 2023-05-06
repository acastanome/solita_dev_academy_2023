const csv = require('csv-parser');
const fs = require('fs');

const getStationsFromFile = (filename) => {
	return new Promise((resolve, reject) => {
		const results = [];

		fs.createReadStream(filename)
			.pipe(
				csv([
					'FID',
					'ID',
					'Nimi',
					'Namn',
					'Name',
					'Osoite',
					'Adress',
					'Kaupunki',
					'Stad',
					'Operaattor',
					'Kapasiteet',
					'x',
					'y',
				])
			)
			.on('data', (data) => {
				const parsedId = parseInt(data.ID);
				const parsedKapasiteet = parseInt(data.Kapasiteet);
				const parsedX = Number(data.x);
				const parsedY = Number(data.y);
				if (
					parsedId >= 0 &&
					parsedKapasiteet >= 0 &&
					parsedX !== NaN &&
					parsedY !== NaN
				)
					results.push({
						...data,
						ID: parsedId,
						Kapasiteet: parsedKapasiteet,
						x: parsedX,
						y: parsedY,
					});
			})
			.on('error', (e) => reject(e))
			.on('end', () => resolve(results));
	});
};

module.exports = { getStationsFromFile };
