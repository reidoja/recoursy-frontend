import { QueryConfig, useQuery } from 'react-query';
import authenticate from '../../../api/auth/authenticate';

export default function useAuthenticate(config?: QueryConfig<any>) {
  return useQuery('authenticate', authenticate, config);
}
