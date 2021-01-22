import { Credentials } from '../../models/User';
import getFetchInstance from '../fetch';

export default async function login(credentials: Credentials) {
  const res = await getFetchInstance().post('/login', credentials);
  return res.data;
}
