import { useEffect, useState } from 'react';
import JourneysList from '../components/JourneysList';
import journeysService from '../services/journeys';
import Journey from '../types/journey';
import QueryParams from '../types/queryParams';
import Pagination from '../components/Pagination';
import SearchJourneys from '../components/SearchJourneys';
import { toast } from 'react-hot-toast';

const Journeys = () => {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [allFilteredJourneys, setAllFilteredJourneys] = useState<Journey[]>([]);
	const [sortAndFilter, setSortAndFilter] = useState<QueryParams>({
		query_term: '',
		station: '',
		limit: 20,
	});

	useEffect(() => {
		const getAllFilteredJourneys = async () => {
			const journeyData = await journeysService.getFilteredJourneys(
				sortAndFilter
			);
			if (journeyData?.rowCount > 0) {
				setAllFilteredJourneys(journeyData.rows);
				setTotalPages(
					Math.ceil(journeyData.rows[0].full_count / sortAndFilter.limit)
				);
			} else {
				toast.error('No journeys matched');
				setTotalPages(1);
				setAllFilteredJourneys([]);
			}
		};
		getAllFilteredJourneys();
	}, [sortAndFilter]);

	const handleNextClick = async () => {
		const newJourneyData = await journeysService.getPageFilteredJourneys(
			page + 1,
			sortAndFilter
		);
		if (newJourneyData?.rowCount > 0) {
			setAllFilteredJourneys(newJourneyData.rows);
			setPage((prev) => prev + 1);
			window.scrollTo({ top: 0 });
		}
	};

	const handlePreviousClick = async () => {
		const newJourneyData = await journeysService.getPageFilteredJourneys(
			page - 1,
			sortAndFilter
		);
		if (newJourneyData?.rowCount > 0) {
			setAllFilteredJourneys(newJourneyData.rows);
			setPage((prev) => prev - 1);
			window.scrollTo({ top: 0 });
		}
	};

	const handleSearch = (params: QueryParams) => {
		setPage(1);
		setSortAndFilter(params);
	};

	return (
		<div className='flex flex-col h-max-screen'>
			<SearchJourneys onSearch={handleSearch} searchParams={sortAndFilter} />
			<JourneysList journeys={allFilteredJourneys} />
			<Pagination
				page={page}
				totalPages={totalPages}
				onNextClick={handleNextClick}
				onPreviousClick={handlePreviousClick}
			/>
		</div>
	);
};

export default Journeys;
