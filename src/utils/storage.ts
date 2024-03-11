export const tokenStorage = () => {
  const storage =
    localStorage.getItem('token') &&
    JSON.parse(localStorage.getItem('token') || '{}');

  return storage?.token;
};

export const setTokenStorage = (token: string) => {
  localStorage.setItem('token', JSON.stringify({ token }));
};

export const getFromStorage = (key: string) =>
  JSON.parse(localStorage.getItem(key) || '{}');

export const setToStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify({ [key]: value }));

export const removeStorage = (key: string) => localStorage.removeItem(key);
