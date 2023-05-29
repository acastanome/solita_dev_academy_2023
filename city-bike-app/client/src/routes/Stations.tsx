import { useEffect, useState } from 'react';
import QueryParams from '../types/queryParams';
import Pagination from '../components/Pagination';
import Station from '../types/station';
import stationsService from '../services/stations';
import StationsList from '../components/StationsList';
import SearchStations from '../components/SearchStations';
import toast from 'react-hot-toast';

const Stations = () => {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [allFilteredStations, setAllFilteredStations] = useState<Station[]>([]);
	const [sortAndFilter, setSortAndFilter] = useState<QueryParams>({
		query_term: '',
		station: '',
		limit: 20,
	});

	useEffect(() => {
		const getAllFilteredStations = async () => {
			const stationsData = await stationsService.getFilteredStations(
				sortAndFilter
			);
			if (stationsData?.rowCount > 0) {
				setAllFilteredStations(stationsData.rows);
				setTotalPages(
					Math.ceil(stationsData.rows[0].full_count / sortAndFilter.limit)
				);
			} else {
				toast.error('No stations matched');
				setTotalPages(1);
				setAllFilteredStations([]);
			}
		};
		getAllFilteredStations();
	}, [sortAndFilter]);

	const handleNextClick = async () => {
		const newStationsData = await stationsService.getPageFilteredStations(
			page + 1,
			sortAndFilter
		);
		if (newStationsData?.rowCount > 0) {
			setAllFilteredStations(newStationsData.rows);
			setPage((prev) => prev + 1);
			window.scrollTo({ top: 0 });
		}
	};

	const handlePreviousClick = async () => {
		const newStationsData = await stationsService.getPageFilteredStations(
			page - 1,
			sortAndFilter
		);
		if (newStationsData?.rowCount > 0) {
			setAllFilteredStations(newStationsData.rows);
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
			<SearchStations onSearch={handleSearch} searchParams={sortAndFilter} />
			<StationsList stations={allFilteredStations} />
			<Pagination
				page={page}
				totalPages={totalPages}
				onNextClick={handleNextClick}
				onPreviousClick={handlePreviousClick}
			/>
		</div>
	);
};

export default Stations;
