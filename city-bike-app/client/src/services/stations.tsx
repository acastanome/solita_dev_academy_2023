import axios from 'axios';
import QueryParams from '../types/queryParams';

const baseUrl = 'http://localhost:3001/stations';

const getAllStations = async () => {
	try {
		const response = await axios.get(baseUrl);
		return response.data;
	} catch (error) {
		console.log('getAllStations error: ', error);
	}
};

const getFilteredStations = async (queryParams: QueryParams) => {
	try {
		const response = await axios.post(baseUrl, queryParams);
		return response.data;
	} catch (error) {
		console.log('getFilteredStations error: ', error);
	}
};

const getPageFilteredStations = async (
	page: number,
	queryParams: QueryParams
) => {
	try {
		const response = await axios.post(`${baseUrl}/page/${page}`, queryParams);
		return response.data;
	} catch (error) {
		console.log('getNextStations error: ', error);
	}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllStations, getFilteredStations, getPageFilteredStations };
