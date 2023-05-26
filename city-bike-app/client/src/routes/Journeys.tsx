import { useEffect, useState } from 'react';
import JourneysList from '../components/JourneysList';
import journeysService from '../services/journeys';
import Journey from '../types/journey';
import QueryParams from '../types/queryParams';
import Pagination from '../components/Pagination';

const Journeys = () => {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [allJourneys, setAllJourneys] = useState<Journey[]>([]);
	const [sortAndFilter, setSortAndFilter] = useState<QueryParams>({
		// station: '',
		// journey: '',
		query_term: '',
		limit: 20,
		// sort_by: 'departure_station', //departure_station, return_station, covered_distance, duration_seconds
		// order_by: 'desc',
	});

	useEffect(() => {
		const getAllJourneys = async () => {
			const journeyData = await journeysService.getFilteredJourneys(
				sortAndFilter
			);
			if (journeyData?.rowCount > 0) {
				setAllJourneys(journeyData.rows);
				setTotalPages(
					Math.ceil(journeyData.rows[0].full_count / sortAndFilter.limit)
				);
			}
		};
		getAllJourneys();
	}, [sortAndFilter]);

	const handleNextClick = async () => {
		const newJourneyData = await journeysService.getPageFilteredJourneys(
			page + 1,
			sortAndFilter
		);
		if (newJourneyData?.rowCount > 0) {
			setAllJourneys(newJourneyData.rows);
			setPage((prev) => prev + 1);
		}
	};

	const handlePreviousClick = async () => {
		const newJourneyData = await journeysService.getPageFilteredJourneys(
			page - 1,
			sortAndFilter
		);
		if (newJourneyData?.rowCount > 0) {
			setAllJourneys(newJourneyData.rows);
			setPage((prev) => prev - 1);
		}
	};

	return (
		<div className='flex flex-col h-screen'>
			{/* <div className='pt-16 flex flex-col items-center'>
				<div className='flex flex-col items-center mb-20 p-8 md:px-24 md:py-24 text-white border-2 border-white rounded-2xl w-10/12 md:w-3/4'>
					<h1 className='text-5xl font-bold'>search</h1>

					<div className='flex flex-col lg:flex-row lg:gap-6 mt-16 w-full xl:max-w-3xl'>
						<label
							htmlFor='genre'
							className='block text-sm font-medium text-white mb-2'
						>
							genre
						</label>
						<select
							onChange={(e) => setGenre(e.target.value)}
							defaultValue=''
							id='genre'
							className='bg-transparent border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
						>
							<option value=''>choose genre</option>
							{genreList.map((genre) => (
								<option key={genre} value={genre}>
									{genre}
								</option>
							))}
						</select>

						<label
							htmlFor='minimum_rating'
							className='block text-sm font-medium text-white mt-6 lg:mt-0 mb-2'
						>
							minimum rating
						</label>
						<select
							onChange={(e) => setRating(e.target.value)}
							defaultValue='0'
							id='minimum_rating'
							className='bg-transparent border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
						>
							<option value=''>choose value</option>
							<option value='0'>0</option>
							<option value='1'>1</option>
							<option value='2'>2</option>
							<option value='3'>3</option>
							<option value='4'>4</option>
							<option value='5'>5</option>
							<option value='6'>6</option>
							<option value='7'>7</option>
							<option value='8'>8</option>
							<option value='9'>9</option>
						</select>

						<label
							htmlFor='sort_by'
							className='block text-sm font-medium text-white mt-6 lg:mt-0 mb-2'
						>
							sort by
						</label>
						<select
							onChange={(e) => setSortBy(e.target.value)}
							defaultValue='title'
							id='sort_by'
							className='bg-transparent border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
						>
							<option value='like_count'>like count</option>
							<option value='title'>mov title</option>
							<option value='year'>mov year</option>
							<option value='rating'>mov rating</option>
						</select>

						<label
							htmlFor='order_by'
							className='block text-sm font-medium text-white mt-6 lg:mt-0 mb-2'
						>
							order by
						</label>
						<select
							onChange={(e) => setOrderBy(e.target.value)}
							defaultValue='desc'
							id='order_by'
							className='bg-transparent border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
						>
							<option value='desc'>descending</option>
							<option value='asc'>ascending</option>
						</select>
					</div>

					<input
						className='bg-transparent mt-10 border-2 p-2 border-white rounded-lg w-full lg:w-1/2'
						type='text'
						placeholder='Search'
						value={search}
						onChange={({ target }) => setSearch(target.value)}
					/>

					<button
						onClick={handleClick}
						className='mt-10 bg-dark-red py-2 px-6 rounded-lg cursor-pointer hover:bg-dark-red/80'
					>
						search
					</button>
				</div>
			</div> */}

			<p>List of journeys:</p>
			<JourneysList journeys={allJourneys} />
			<Pagination
				page={page}
				totalPages={totalPages}
				handleNextClick={handleNextClick}
				handlePreviousClick={handlePreviousClick}
			/>
		</div>
	);
};

export default Journeys;
