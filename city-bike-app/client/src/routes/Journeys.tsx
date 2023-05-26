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
			if (journeyData.rowCount > 0) {
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
		if (newJourneyData.rowCount > 0) {
			setAllJourneys(newJourneyData.rows);
			setPage((prev) => prev + 1);
		}
	};

	const handlePreviousClick = async () => {
		const newJourneyData = await journeysService.getPageFilteredJourneys(
			page - 1,
			sortAndFilter
		);
		if (newJourneyData.rowCount > 0) {
			setAllJourneys(newJourneyData.rows);
			setPage((prev) => prev - 1);
		}
	};

	return (
		<div className='flex flex-col h-screen'>
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
