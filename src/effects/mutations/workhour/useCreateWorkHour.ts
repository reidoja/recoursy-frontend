import mutationWrapper from '../mutationWrapper';
import { queryCache } from 'react-query';
import createWorkHour from '../../../api/workhour/createWorkHour';

const useCreateWorkHour = mutationWrapper(createWorkHour, {
  onSuccess: () => {
    queryCache.invalidateQueries('workhour');
  },
});
export default useCreateWorkHour;
