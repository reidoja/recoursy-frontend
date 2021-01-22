import { useQuery } from 'react-query';
import fetchAdminPending from '../../../api/delivery/fetchAdminPending';
import queryWrapper from '../queryWrapper';

export default function useFetchAdminPending() {
  return useQuery(['delivery-admin-pending'], queryWrapper(fetchAdminPending));
}
