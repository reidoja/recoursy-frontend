import { DeliveryHistoryDetail } from '../../models/Delivery';
import getFetchInstance from '../fetch';

export default async function fetchQueue(): Promise<DeliveryHistoryDetail[]> {
  const res = await getFetchInstance().get('/delivery/view-queue');
  return res.data;
}
