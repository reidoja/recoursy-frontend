import mutationWrapper from '../mutationWrapper';
import { queryCache } from 'react-query';
import deleteWorkHour from '../../../api/workhour/deleteWorkHour';

const useDeleteWorkHour = mutationWrapper(deleteWorkHour, {
  onSuccess: () => {
    queryCache.invalidateQueries('workhour');
  },
});
export default useDeleteWorkHour;
