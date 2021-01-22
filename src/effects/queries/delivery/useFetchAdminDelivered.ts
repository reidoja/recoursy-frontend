import { useQuery } from 'react-query';
import fetchAdminDelivered from '../../../api/delivery/fetchAdminDelivered';
import queryWrapper from '../queryWrapper';

export default function useFetchAdminDelivered() {
  return useQuery(
    ['delivery-admin-delivered'],
    queryWrapper(fetchAdminDelivered)
  );
}
