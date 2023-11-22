import { CarDTO } from './carDTO';

export type SchedulesByUser = {
  id: number;
  userId: number;
  car: CarDTO;
  startDate: string;
  endDate: string;
};
