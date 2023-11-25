import axios from 'axios';
import { FlightDiary, NewDiary } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAll = () =>
	axios.get<FlightDiary[]>(baseUrl).then((response) => response.data);

export const addDiary = (newDiary: NewDiary) =>
	axios.post<FlightDiary>(baseUrl, newDiary).then((response) => response.data);
