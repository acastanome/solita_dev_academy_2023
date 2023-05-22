type Journey = {
	id: Number;
	departure: Date;
	return: Date;
	departureStationId: number;
	departureStationName: string;
	returnStationId: number;
	returnStationName: string;
	coveredDistanceMeters: number;
	durationSeconds: number;
};

export default Journey;
