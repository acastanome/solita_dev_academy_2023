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
				const parsedNimi = data.Nimi.normalize().replace(/\s+/g, ' ');
				const parsedNamn = data.Namn.normalize().replace(/\s+/g, ' ');
				const parsedName = data.Name.normalize().replace(/\s+/g, ' ');
				const parsedOsoite = data.Osoite.normalize().replace(/\s+/g, ' ');
				const parsedAdress = data.Adress.normalize().replace(/\s+/g, ' ');
				const parsedKaupunki = data.Kaupunki.normalize().replace(/\s+/g, ' ');
				const parsedStad = data.Stad.normalize().replace(/\s+/g, ' ');
				const parsedOperaattor = data.Operaattor.normalize().replace(
					/\s+/g,
					' '
				);
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
						Nimi: parsedNimi,
						Namn: parsedNamn,
						Name: parsedName,
						Osoite: parsedOsoite,
						Adress: parsedAdress,
						Kaupunki: parsedKaupunki,
						Stad: parsedStad,
						Operaattor: parsedOperaattor,
					});
			})
			.on('error', (e) => reject(e))
			.on('end', () => resolve(results));
	});
};

module.exports = { getStationsFromFile };
