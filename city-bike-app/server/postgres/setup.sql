CREATE TABLE IF NOT EXISTS stations (
  id SERIAL NOT NULL PRIMARY KEY,
	fid VARCHAR(1000),
	station_id VARCHAR(1000) NOT NULL,
  nimi VARCHAR(1000),
  namn VARCHAR(1000),
  name VARCHAR(1000) NOT NULL,
	osoite VARCHAR(1000) NOT NULL,
	adress VARCHAR(1000),
	kaupunki VARCHAR(1000),
	stad VARCHAR(1000),
	operaattor VARCHAR(1000),
	kapasiteet INT NOT NULL,
	x NUMERIC NOT NULL,
	y NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS journeys (
  id SERIAL NOT NULL PRIMARY KEY,
	departure_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	return_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  departure_station_id VARCHAR(1000) NOT NULL,
  departure_station_name VARCHAR(1000) NOT NULL,
  return_station_id VARCHAR(1000) NOT NULL,
	return_station_name VARCHAR(1000) NOT NULL, 
	covered_distance_meters INT DEFAULT 0,
	duration_seconds INT DEFAULT 0
);