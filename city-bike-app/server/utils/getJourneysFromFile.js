const csv = require('csv-parser');
const fs = require('fs');

const isValidPositiveInt = (someString) => {
	const nb = parseInt(someString);
	if (isNaN(nb) || nb < 0) return false;
	return true;
};

const isValidDate = (dateString) => {
	if (isNaN(Date.parse(dateString))) return false;
	return true;
};

const isValidJourneyData = (journey) => {
	if (!isValidDate(journey.Departure)) return false;
	if (!isValidDate(journey.Return)) return false;
	if (!isValidPositiveInt(journey['Departure station id'])) return false;
	if (!isValidPositiveInt(journey['Return station id'])) return false;
	if (!isValidPositiveInt(journey['Covered distance (m)'])) return false;
	if (!isValidPositiveInt(journey['Duration (sec.)'])) return false;

	let timeDiff =
		(Date.parse(journey.Return) - Date.parse(journey.Departure)) / 1000;
	if (timeDiff !== parseInt(journey['Duration (sec.)'])) return false;

	return true;
};

const getJourneysFromFile = async (filename) => {
	return new Promise((resolve, reject) => {
		const results = [];

		fs.createReadStream(filename)
			.pipe(
				csv([
					'Departure',
					'Return',
					'Departure station id',
					'Departure station name',
					'Return station id',
					'Return station name',
					'Covered distance (m)',
					'Duration (sec.)',
				])
			)
			.on('data', (data) => {
				if (isValidJourneyData(data) === true) {
					results.push({
						...data,
						Departure: new Date(data.Departure),
						Return: new Date(data.Return),
						'Departure station id': parseInt(data['Departure station id']),
						'Return station id': parseInt(data['Return station id']),
						'Covered distance (m)': parseInt(data['Covered distance (m)']),
						'Duration (sec.)': parseInt(data['Duration (sec.)']),
					});
				}
			})
			.on('error', (e) => reject(e))
			.on('end', () => resolve(results));
	});
};

module.exports = { getJourneysFromFile };
