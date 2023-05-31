# Solita_dev_academy_2023

Assignment for Solita's Dev Academy 2023, by Alba Castaño

## Stack:

React.js, TailwindCSS, Node.js, PostgreSQL.

## Requirements:

- The app was developed for Chrome, and uses ports 3000 and 3001, make sure they are free.
- The project uses Node.js version v18.16.0. Installation: https://nodejs.org/en/download

- At root of the server directory, create a .env file containing:
  PORT = 3001
  PGHOST=localhost
  PGDATABASE=solita

### Setting up the database:

- Postgres must be installed in the computer. If not, it can be installed with brew: In the terminal, run the command "brew install postgresql".
- Create db: "createdb solita"
- Connect to db: "psql solita"
- Create db tables: Once connected to the db, copy contents of setup.sql file (https://github.com/acastanome/solita_dev_academy_2023/blob/main/city-bike-app/server/postgres/setup.sql)

### Running the project:

- In city-bike-app/server directory, run the command "npm install". After that, run the command "npm run dev".
- In city-bike-app/client directory, run the command "npm install". After that, run the command "npm start".
- The previous step should open your browser, if it doesn't, go to http://localhost:3000/

## The assignment:

### Especial note:

When validating the journeys, some stations would be considered as invalid when comparing the names with the valid stations. One such example is Vallilan varikko station.
I tried to compare the length, and looked into encoding issues, normalizing the strings. Nothing seemed to work. After investigating the problem in HSL's page (https://public-transport-hslhrt.opendata.arcgis.com/datasets/helsingin-ja-espoon-kaupunkipyöräasemat-avoin/explore?location=60.194920%2C24.964426%2C15.27), it became clear they have the same problem, as the station can be found by searching the address, and shows in the map, but can't be found from searching it's name.
Finally, the problem was solved by normalizing whitespaces with regex.

### Data import:

- All recommended features were implemented.
- Additionally, during data validation the following was taken to account:

  - Stations can have the same adress. (HSL data)

- In the .csv files many stations don't have a value for Kaupunki, Stad or Operaattor. They are still considered valid stations.

  - Stations names and id’s from the journey .csv files dont always match those in the stations .csv. This seems to be caused by stations being renamed. Journeys where the station names and id's don't match both the name and id for a valid station were considered invalid.
  - Low to none maintenance from Schibsted's part

- Because of time constraints, we will focus on the rating system from the user perspective, developing an MVP frontend.

### View:

- When a station doesn't have a value for the city, it will be displayed as empty.

### Search:

- When searching for 'sd', stations with no value for Kaupunki will be returned.
