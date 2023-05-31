import { useEffect, useState } from 'react';
import Station from '../types/station';
import stationsService from '../services/stations';

const StationPage: React.FC<{ id: string | undefined }> = (props) => {
	const [station, setStation] = useState<Station>();
	const [journeysFrom, setJourneysFrom] = useState(0);
	const [journeysTo, setJourneysTo] = useState(0);
	const [popularDepartureStations, setPopularDepartureStation] =
		useState<Station[]>();
	const [popularReturnStations, setPopularReturnStation] =
		useState<Station[]>();

	useEffect(() => {
		const getStation = async () => {
			if (props.id !== undefined) {
				const id = parseInt(props.id);
				const stationData = await stationsService.getStationById(id);
				if (stationData.station) {
					setStation(stationData.station);
					setPopularDepartureStation(stationData.popularDepartureStations);
					setPopularReturnStation(stationData.popularReturnStations);
					setJourneysFrom(stationData.journeyCounts.departures);
					setJourneysTo(stationData.journeyCounts.returns);
				}
			}
		};
		getStation();
	}, []);

	if (station) {
		return (
			<div className='flex flex-col space-y-1 h-max-screen pt-1'>
				<h1 className='max-w-screen-md h-max self-center text-blue-950 font-bold py-2 px-4 rounded border md:border-blue-300'>
					{station.name} station
				</h1>
				<ul className='max-w-screen-md h-max space-y-1 self-center text-blue-950 py-2 px-4 rounded border md:border-blue-300'>
					<li>
						<b>Address: </b>
						{station.osoite}
					</li>
					<li>
						<b>Capacity: </b>
						{station.kapasiteet}
					</li>
					<li>
						<b>Total journeys starting here: </b>
						{journeysFrom}
					</li>
					<li>
						<b>Total journeys ending here: </b>
						{journeysTo}
					</li>
					<li>
						<b>Popular Departure stations: </b>
						<ul className='flex flex-col pl-1 self-center'>
							{popularDepartureStations?.map((s) => (
								<li key={s.name}>{s.name}</li>
							))}
						</ul>
					</li>
					<li>
						<b>Popular Return stations: </b>
						<ul className='flex flex-col pl-1 self-center'>
							{popularReturnStations?.map((s) => (
								<li key={s.name}>{s.name}</li>
							))}
						</ul>
					</li>
				</ul>
			</div>
		);
	} else {
		return (
			<div className='flex flex-col h-max-screen'>
				<p className='max-w-screen-md h-max text-blue-950 py-2 px-4 rounded border md:border-blue-300 hover:bg-blue-100'>
					No such station
				</p>
			</div>
		);
	}
};

export default StationPage;
