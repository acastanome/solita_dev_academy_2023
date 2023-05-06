const validateSatation = async (station) => {
	if (
		station &&
		station.ID &&
		station.Nimi &&
		station.Namn &&
		station.Name &&
		station.Osoite &&
		station.Adress &&
		station.Kaupunki &&
		station.Stad &&
		station.Operaattor &&
		station.Kapasiteet &&
		station.x &&
		station.y
	)
		return true;
	return false;
};

module.exports = { validateSatation };
