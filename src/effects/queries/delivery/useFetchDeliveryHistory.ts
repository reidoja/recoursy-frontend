import { useQuery } from 'react-query';
import fetchDeliveryHistory from '../../../api/delivery/fetchDeliveryHistory';
import queryWrapper from '../queryWrapper';

export default function useFetchDeliveryHistory() {
  return useQuery(['delivery-history'], queryWrapper(fetchDeliveryHistory));
}
