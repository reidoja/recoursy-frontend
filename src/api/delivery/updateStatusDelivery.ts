import getFetchInstance from '../fetch';

export default async function updateStatusDelivery({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const res = await getFetchInstance().post('/update-status-delivery', {
    id: id,
    status: status,
  });
  console.log(res);
}
