import { PostDelivery } from '../../models/Delivery';
import getFetchInstance from '../fetch';

export default async function createDelivery(data: PostDelivery) {
  const res = await getFetchInstance().post('/create-delivery', data);
  console.log(res);
}
