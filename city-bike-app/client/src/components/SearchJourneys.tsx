import { useEffect, useState } from 'react';
import QueryParams from '../types/queryParams';
import Station from '../types/station';
import stationsService from '../services/stations';

const SearchJourneys: React.FC<{
	onSearch: (params: QueryParams) => void;
	searchParams: QueryParams;
}> = (props) => {
	const [allStations, setAllStations] = useState<Station[]>([]);
	const [search, setSearch] = useState('');
	const [departureStation, setDepartureStation] = useState('');

	useEffect(() => {
		const getAllStations = async () => {
			const stationsData = await stationsService.getAllStations();
			if (stationsData?.rowCount > 0) {
				setAllStations(stationsData.rows);
			}
		};
		getAllStations();
	}, []);

	const handleClick = () => {
		const newSearch = {
			...props.searchParams,
			query_term: search,
			station: departureStation,
		};
		props.onSearch(newSearch);
	};

	return (
		<div className='p-2 flex flex-col items-center'>
			<div className='flex flex-col items-center space-y-2 p-3 pt-1 pb-2 md:px-24 text-blue-950 border-2 border-white bg-blue-100 rounded-2xl w-full md:w-3/4'>
				<div className='flex flex-col lg:flex-row lg:gap-6 w-full xl:max-w-3xl'>
					<label
						htmlFor='departureStation'
						className='block text-sm font-medium p-2 md:p-2.5'
					>
						Departure Station
					</label>
					<select
						onChange={(e) => setDepartureStation(e.target.value)}
						defaultValue=''
						id='departureStation'
						className='bg-transparent border border-blue-300 text-blue-950 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-950 block w-full p-2 md:p-2.5'
					>
						<option value=''>choose departure station</option>
						{allStations.map((station) => (
							<option key={station.stationId} value={station.name}>
								{station.name}
							</option>
						))}
					</select>
				</div>
				<p className='block text-sm font-medium'>or</p>
				<input
					className='bg-transparent border-2 text-sm p-2 border-blue-300 rounded-lg w-full lg:w-1/2'
					type='text'
					placeholder='Search'
					value={search}
					onChange={({ target }) => setSearch(target.value)}
				/>

				<button
					onClick={handleClick}
					className='text-blue-950 py-2 px-6 rounded-lg border border-blue-300 cursor-pointer hover:bg-blue-300'
				>
					Search
				</button>
			</div>
		</div>
	);
};

export default SearchJourneys;
