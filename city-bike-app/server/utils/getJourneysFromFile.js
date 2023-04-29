const csv = require('csv-parser');
const fs = require('fs');

// journey.Dwparture = new Date(Date.parse(data.Departure)).toISOString()

const isValidDate = (dateString) => {
	if (isNaN(Date.parse(dateString))) return false;
	return true;
};

const isValidJourney = (journey) => {
	if (!isValidDate(journey.Departure)) return false;
	if (!isValidDate(journey.Return)) return false;

	let timeDiff =
		(Date.parse(journey.Return) - Date.parse(journey.Departure)) / 1000;

	if (timeDiff < 10 || timeDiff !== parseInt(journey['Duration (sec.)']))
		return false;

	// Add validation: Is covered distance >= 10m? Do station name and id match? (swedish names too) Is the distance between coordinates same as the given covered distance? (beware units)

	return true;
};

const getJourneysFromFile = (filename) => {
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
			if (isValidJourney(data) === true) {
				results.push(data);
			}
		})
		.on('error', (e) => console.log(e))
		.on('end', () => console.log(results));

	return results;
};

module.exports = { getJourneysFromFile };
