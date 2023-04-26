import { createContext } from 'react';
import { AppContextType } from 'types/app';

const AppContext = createContext<AppContextType>({
  cookies: null,
  http: null,
});
export default AppContext;
