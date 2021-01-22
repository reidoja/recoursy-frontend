import { atom } from 'recoil';
import { UserData } from '../models/User';

const userState = atom<null | UserData>({
  key: 'user',
  default: null,
});
export default userState;
