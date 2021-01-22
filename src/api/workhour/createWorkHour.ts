import getFetchInstance from '../fetch';

export default async function createWorkHour({
  from,
  to,
  note,
}: {
  from: string;
  to: string;
  note: string;
}) {
  const res = await getFetchInstance().post('/add-admin-workhour', {
    from,
    to,
    note,
  });
  console.log(res);
}
