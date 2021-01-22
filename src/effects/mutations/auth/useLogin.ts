import login from '../../../api/auth/login';
import mutationWrapper from '../mutationWrapper';

const useLogin = mutationWrapper(login);
export default useLogin;
