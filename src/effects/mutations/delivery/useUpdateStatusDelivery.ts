import mutationWrapper from '../mutationWrapper';
import { queryCache } from 'react-query';
import updateStatusDelivery from '../../../api/delivery/updateStatusDelivery';

const useUpdateStatusDelivery = mutationWrapper(updateStatusDelivery, {
  onSuccess: () => {
    queryCache.invalidateQueries('delivery-admin-pending');
    queryCache.invalidateQueries('delivery-admin-delivered');
  },
});
export default useUpdateStatusDelivery;
