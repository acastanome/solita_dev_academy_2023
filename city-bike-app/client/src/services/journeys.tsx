import axios from 'axios';
import QueryParams from '../types/queryParams';

const baseUrl = 'http://localhost:3001/journeys';

const getFilteredJourneys = async (queryParams: QueryParams) => {
	try {
		const response = await axios.post(baseUrl, queryParams);
		return response.data;
	} catch (error) {
		console.log('getFilteredJourneys error: ', error);
	}
};

const getPageFilteredJourneys = async (
	page: number,
	queryParams: QueryParams
) => {
	try {
		const response = await axios.post(`${baseUrl}/page/${page}`, queryParams);
		return response.data;
	} catch (error) {
		console.log('getNextJourneys error: ', error);
	}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getFilteredJourneys, getPageFilteredJourneys };
