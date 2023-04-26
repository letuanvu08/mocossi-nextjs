import Cookies from 'universal-cookie';
import { User } from 'types/user';
import { isClientSide } from 'utils/app';
import createHttp, { HttpInstance } from 'utils/http';
import { getStorage, setStorage, removeStorage } from 'utils/storage';


const authCookieName = 'mocossi';

export function saveSession(user) {
  if (typeof window !== 'undefined') {
    const userData = JSON.stringify(user);
    setStorage('user', userData, true);

    const cookies = new Cookies();
    cookies.set(authCookieName, userData, { path: '/' });
  }
}

export function removeSession() {
  removeStorage('user');

  const cookies = new Cookies();
  cookies.remove(authCookieName, { path: '/' });
}


class UserService {
  http: HttpInstance;

  constructor(http: HttpInstance) {
    this.http = http || createHttp();
  }

  updateRequestAuth(user: User) {
    const { jwt, accessToken } = user;

    if (jwt && this.http.setAuthHeader) {
      this.http.setAuthHeader(jwt);
    } else if (this.http.setAccessToken) {
      this.http.setAccessToken(accessToken);
    }
  }

  performAuth(cookies?: Cookies) {
    let userBlob: any = {};

    if (!!cookies) {
      userBlob = cookies.get(authCookieName) || {};
    } else if (isClientSide()) {
      userBlob = getStorage('user') || {};
    }

    const { accessToken } = userBlob;
    if (!!accessToken) {
      this.updateRequestAuth(userBlob);
      return new Promise(resolve => resolve(userBlob));
    }

    return new Promise(resolve => resolve({} as any));
  }
}

const userService = (http?: any) => new UserService(http);
export default userService;
