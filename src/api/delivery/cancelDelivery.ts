import { PostDelivery } from '../../models/Delivery';
import getFetchInstance from '../fetch';

export default async function cancelDelivery(id: string) {
  const res = await getFetchInstance().post('/cancel-delivery', { id: id });
  console.log(res);
}
