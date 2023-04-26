import Cookies from 'universal-cookie';
import { AppContextType } from 'types/app';
import createHttp from 'utils/http';

class StoreSettings {
  storeContext;

  getStoreContext(): AppContextType {
    if (!this.storeContext) {
      const http = createHttp();
      const cookies = new Cookies();
      this.storeContext = { cookies, http };
    }

    return this.storeContext;
  }
}

const storeSettings = () => new StoreSettings();
export default storeSettings;
