const isValidJourney = (journey) => {
	if (journey['Duration (sec.)'] < 10) return false;
	if (journey['Covered distance (m)'] < 10) return false;

	return true;
};

module.exports = { isValidJourney };
