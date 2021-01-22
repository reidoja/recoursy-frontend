import { DeliveryHistory } from '../../models/Delivery';
import getFetchInstance from '../fetch';

export default async function fetchAdminPending(): Promise<DeliveryHistory[]> {
  const res = await getFetchInstance().get('/view-admin-pending-delivery');
  return res.data;
}
