import getFetchInstance from '../fetch';

export default async function deleteWorkHour({ id }: { id: string }) {
  const res = await getFetchInstance().post('/delete-admin-workhour', {
    id,
  });
  console.log(res);
}
