export function setLocal(key: string, value: any): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

export function getLocal(key: string): any {
  let value: any = null;

  try {
    value = window.localStorage.getItem(key);
    value = JSON.parse(value);
  } catch (e) {}

  return value;
}

export function setSession(key: string, value: any): void {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

export function getSession(key: string): any {
  let value: any = null;

  try {
    value = window.sessionStorage.getItem(key);
    value = JSON.parse(value);
  } catch (e) {}

  return value;
}

export function setStorage(key: string, value: any, persist = false): void {
  setSession(key, value);

  if (persist) {
    setLocal(key, value);
  }
}

export function getStorage(key: string): any {
  return getSession(key) || getLocal(key) || null;
}

export function removeStorage(key: string): void {
  try {
    window.sessionStorage.removeItem(key);
    window.localStorage.removeItem(key);
  } catch (e) {}
}
