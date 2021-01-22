import getFetchInstance from '../fetch';

export default async function authenticate() {
  const res = await getFetchInstance().get('/user');
  return res.data;
}
