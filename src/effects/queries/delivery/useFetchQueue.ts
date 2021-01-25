import { useQuery } from 'react-query';
import fetchQueue from '../../../api/delivery/fetchQueue';
import queryWrapper from '../queryWrapper';

export default function useFetchQueue() {
  return useQuery(['delivery-queue'], queryWrapper(fetchQueue));
}
