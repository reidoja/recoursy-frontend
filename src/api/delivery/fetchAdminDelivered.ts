import { DeliveryHistory } from '../../models/Delivery';
import getFetchInstance from '../fetch';

export default async function fetchAdminDelivered(): Promise<
  DeliveryHistory[]
> {
  const res = await getFetchInstance().get('/view-admin-delivered-delivery');
  return res.data;
}
