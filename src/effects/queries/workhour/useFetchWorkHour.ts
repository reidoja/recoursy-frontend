import { useQuery } from 'react-query';
import fetchWorkHour from '../../../api/workhour/fetchWorkHour';
import queryWrapper from '../queryWrapper';

export default function useFetchWorkHour(search?: string) {
  return useQuery(['workhour', search], queryWrapper(fetchWorkHour));
}
