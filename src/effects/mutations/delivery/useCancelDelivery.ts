import mutationWrapper from '../mutationWrapper';
import { queryCache } from 'react-query';
import cancelDelivery from '../../../api/delivery/cancelDelivery';

const useCancelDelivery = mutationWrapper(cancelDelivery, {
  onSuccess: () => {
    queryCache.invalidateQueries('delivery-history');
    queryCache.invalidateQueries('delivery-request');
  },
});
export default useCancelDelivery;
