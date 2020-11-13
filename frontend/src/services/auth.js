const AUTH_TOKEN = 'AUTH_TOKEN';

export const saveToken = (token) => {
  localStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem(AUTH_TOKEN));
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};
