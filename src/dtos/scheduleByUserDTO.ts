import { CarDTO } from "./carDTO"

export type SchedulesByUser = {
  id: number;
  user_id: number;
  car: CarDTO;
  startDate: string;
  endDate: string
}