import { DeliveryHistory } from '../../models/Delivery';
import getFetchInstance from '../fetch';

export default async function fetchDeliveryHistory(): Promise<
  DeliveryHistory[]
> {
  const res = await getFetchInstance().get('/view-history-delivery');
  return res.data;
}
