import axios from 'axios';
import { getCookie } from '../utils/cookies';

export function getAppKey() {
  return process.env.REACT_APP_KEY;
}

export let backendURL = 'http://127.0.0.1';
export let urlPort = '8000';

export default function getFetchInstance() {
  const token = getCookie('tkn');
  return axios.create({
    baseURL: `${backendURL}:${urlPort}/api`,
    headers: {
      app_key: getAppKey(),
      authorization: token && `Bearer ${token}`,
    },
  });
}
