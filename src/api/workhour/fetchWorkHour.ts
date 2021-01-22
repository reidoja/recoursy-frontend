import { WorkHour } from '../../models/Workhour';
import getFetchInstance from '../fetch';

export default async function fetchWorkHour(hour: string): Promise<WorkHour[]> {
  const res = await getFetchInstance().get(`/workhour?hour=${hour}`);
  return res.data;
}
