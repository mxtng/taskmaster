const USER_AUTH = 'USER_AUTH';

export const saveUserAuth = (userAuthData) => {
  localStorage.setItem(USER_AUTH, JSON.stringify(userAuthData));
};

export const getUserAuth = () => {
  return JSON.parse(localStorage.getItem(USER_AUTH));
};

export const removeUserAuth = () => {
  localStorage.removeItem(USER_AUTH);
};
