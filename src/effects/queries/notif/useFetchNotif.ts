import { useQuery } from 'react-query';
import fetchNotif from '../../../api/notif/fetchNotif';
import queryWrapper from '../queryWrapper';

export default function useFetchNotif(id?: number) {
  return useQuery(['notif', id], queryWrapper(fetchNotif), { enabled: false });
}
