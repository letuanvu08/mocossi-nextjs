export const storeAppData = 'app.data';

export interface AppActionType {
  type: typeof storeAppData;
  payload: any;
}

export const appActions = {
  storeAppData(payload): AppActionType {
    return {
      type: storeAppData,
      payload,
    };
  },
};
