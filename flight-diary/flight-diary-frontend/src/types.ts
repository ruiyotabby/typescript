export interface FlightDiary {
	id: number;
	date: string;
	weather: string;
	visibility: string;
	comment?: string;
}

export type NewDiary = Omit<FlightDiary, 'id'>;
