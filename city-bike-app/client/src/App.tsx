import { Navigate, Route, Routes } from 'react-router-dom';
import Landing from './routes/Landing';
import Journeys from './routes/Journeys';

const App = () => {
	return (
		<div>
			<Routes>
				<Route path='/journeys' element={<Journeys />} />
				{/* <Route path='/journeys/:id' element={<JourneyPage id={journeyId} />} />
				<Route path='/stations' element={<Stations />} />
				<Route path='/stations/:id' element={<StationPage id={stationId} />} /> */}
				<Route path='/' element={<Landing />} />
				<Route path='*' element={<Navigate replace to='/' />} />
			</Routes>
		</div>
	);
};

export default App;
