# Solita_dev_academy_2023

Pre-assignment for Solita's Dev Academy 2023, by Alba Castaño

## Stack:

React.js, TailwindCSS, Node.js, PostgreSQL.

## Requirements:

- The app was developed for Chrome, and uses ports 3000 and 3001, make sure they are free.
- The project uses Node.js version v18.16.0. Installation: https://nodejs.org/en/download

- At root of the server directory, create a .env file containing:
  PORT = 3001
  PGHOST=localhost
  PGDATABASE=solita

- Add the following files to city-bike-app/server/assets/journey_data directory:
  https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv named as 2021-05.csv
  https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv named as 2021-06.csv
  https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv named as 2021-07.csv
  Delete the file 2021-01.csv

### Setting up the database:

- Postgres must be installed in the computer. If not, it can be installed with brew: In the terminal, run the command "brew install postgresql".
- Make sure there is no databases called solita, containing tables called stations or journeys.
- Create db: "createdb solita"
- Connect to db: "psql solita"
- Create db tables: Once connected to the db, copy contents of setup.sql file (https://github.com/acastanome/solita_dev_academy_2023/blob/main/city-bike-app/server/postgres/setup.sql)

### Running the project:

- In city-bike-app/server directory, run the command "npm install". After that, run the command "npm run dev".
- In chrome, go to http://localhost:3001/stations/populateDatabase to add the stations from the .csv file to the database. This will take a couple of minutes. To be sure, please wait 3min before going to the next step. There should be 457 stations in the db table.
- In chrome, go to http://localhost:3001/journeys/populateDatabase to add the journeys from the .csv files to the database. This will take a couple of minutes. To be sure, please wait 3min before going to the next step. There should be 113558 journeys in the db table.
- In city-bike-app/client directory, run the command "npm install". After that, run the command "npm start".
- The previous step should open your browser, if it doesn't, go to http://localhost:3000/

## The assignment:

### Data import:

- All recommended features were implemented.
- Additionally, during data validation the following was taken to account:

  - Stations can have the same address. (HSL data)
  - In the .csv files many stations don't have a value for Kaupunki, Stad or Operaattor. They are still considered valid stations.
  - Stations names and id’s from the journey .csv files dont always match those in the stations .csv. This seems to be caused by stations being renamed. Journeys where the station names and id's don't match both the name and id for a valid station were considered invalid.

### Station List:

- Recommended and additional features were implemented. Search can be done for a stations name, address or city.
- When a station doesn't have a value for the city, it will be displayed as empty.
- When searching for 'sd', stations with no value for Kaupunki will be returned.

### Single Station View:

- Can be accessed by clicking on a station from the station list.
- Recommended features, as well as additional: Top 5 most popular return stations for journeys starting from the station, and top 5 most popular departure stations for journeys ending at the station.

### Journey List View:

- Recommended features, as well as additional: pagination, searching (a station name or address) and filtering (by departure station).
- When a station doesn't have a value for the city, it will be displayed as empty.

## 🍾  Especial note:

When validating the journeys, some stations would be considered as invalid when comparing the names with the valid stations. One such example is Vallilan varikko station.
I tried to compare the length, and looked into encoding issues, normalizing the strings. Nothing seemed to work.
After investigating the problem in HSL's page (https://public-transport-hslhrt.opendata.arcgis.com/datasets/helsingin-ja-espoon-kaupunkipyöräasemat-avoin/explore?location=60.194920%2C24.964426%2C15.27), it became clear they have the same problem, as the station can be found by searching the address, and shows in the map, but can't be found from searching it's name.
Finally, the problem was solved by normalizing whitespaces with regex.
