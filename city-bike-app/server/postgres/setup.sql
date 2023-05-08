CREATE TABLE IF NOT EXISTS stations (
	id SERIAL NOT NULL PRIMARY KEY,
	station_id INT NOT NULL UNIQUE,
	nimi VARCHAR(1000),
	namn VARCHAR(1000),
	name VARCHAR(1000) NOT NULL,
	osoite VARCHAR(1000) NOT NULL,
	adress VARCHAR(1000) NOT NULL,
	kaupunki VARCHAR(1000),
	stad VARCHAR(1000),
	operaattor VARCHAR(1000),
	kapasiteet VARCHAR(1000),
	x NUMERIC,
	y NUMERIC
);

CREATE TABLE IF NOT EXISTS journeys (
	id SERIAL NOT NULL PRIMARY KEY,
	departure_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	return_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	departure_station_id INT NOT NULL,
  	departure_station_name VARCHAR(1000),
  	return_station_id INT NOT NULL,
	return_station_name VARCHAR(1000), 
	covered_distance_meters INT DEFAULT 0,
	duration_seconds INT DEFAULT 0
);