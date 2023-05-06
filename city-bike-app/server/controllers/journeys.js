const { getJourneysFromFile } = require('../utils/getJourneysFromFile');

const journeysRouter = require('express').Router();

// get all journeys from file
journeysRouter.get('/', async (req, res) => {
	try {
		const allJourneys = await getJourneysFromFile(
			'./assets/journey_data/2021-01.csv'
		);
		console.log(allJourneys);
		res.status(200).json(allJourneys);
	} catch (e) {
		console.log(e);
	}
});

module.exports = journeysRouter;
