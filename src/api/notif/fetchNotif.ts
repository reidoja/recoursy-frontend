import getFetchInstance from '../fetch';

export default async function fetchNotif(id?: number) {
  const res = await getFetchInstance().get(`/change-notif/${id}`);
  return res.data;
}
