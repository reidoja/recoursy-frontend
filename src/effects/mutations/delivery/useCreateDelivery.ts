import mutationWrapper from '../mutationWrapper';
import { queryCache } from 'react-query';
import createDelivery from '../../../api/delivery/createDelivery';

const useCreateDelivery = mutationWrapper(createDelivery, {
  onSuccess: () => {
    queryCache.invalidateQueries('delivery-history');
    queryCache.invalidateQueries('delivery-request');
  },
});
export default useCreateDelivery;
