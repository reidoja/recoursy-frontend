import { DeliveryHistory } from '../../models/Delivery';
import getFetchInstance from '../fetch';

export default async function fetchDeliveryHistory(): Promise<
  DeliveryHistory[]
> {
  const res = await getFetchInstance().get('/view-user-delivery');
  return res.data;
}
