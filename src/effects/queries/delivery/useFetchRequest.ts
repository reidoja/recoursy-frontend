import { useQuery } from 'react-query';
import fetchRequest from '../../../api/delivery/fetchRequest';
import queryWrapper from '../queryWrapper';

export default function useFetchRequest() {
  return useQuery(['delivery-request'], queryWrapper(fetchRequest));
}
