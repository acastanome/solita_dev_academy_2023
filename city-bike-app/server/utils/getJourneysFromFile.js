const csv = require('csv-parser');
const fs = require('fs');
const { getStationsFromFile } = require('./getStationsFromFile');

const isValidDate = (dateString) => {
	if (isNaN(Date.parse(dateString))) return false;
	return true;
};

const isValidStation = (stationName, stationId, allStations) => {
	const stations = allStations.filter(
		(station) =>
			station['ID'] === stationId &&
			(station['Nimi'] === stationName ||
				station['Namn'] === stationName ||
				station['Name'] === stationName)
	);
	if (stations.length > 0) return true;
	else return false;
};

const isValidJourney = (journey, allStations) => {
	if (!isValidDate(journey.Departure)) return false;
	if (!isValidDate(journey.Return)) return false;

	let timeDiff =
		(Date.parse(journey.Return) - Date.parse(journey.Departure)) / 1000;

	if (timeDiff < 10 || timeDiff !== parseInt(journey['Duration (sec.)']))
		return false;

	if (parseInt(journey['Covered distance (m)']) < 10) return false;

	if (
		!isValidStation(
			journey['Departure station name'],
			journey['Departure station id'],
			allStations
		) ||
		!isValidStation(
			journey['Return station name'],
			journey['Return station id'],
			allStations
		)
	)
		return false;

	return true;
};

const getJourneysFromFile = async (filename) => {
	const allStations = await getStationsFromFile(
		'./assets/bike_stations_data/Helsingin_ja_Espoon_asemat_avoin.csv'
	);

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
				if (isValidJourney(data, allStations) === true) {
					results.push(data);
				}
			})
			.on('error', (e) => reject(e))
			.on('end', () => resolve(results));
	});
};

module.exports = { getJourneysFromFile };
