export const setAccessToken = (token) => {
  localStorage.setItem('ACCESS-TOKEN', token);
};

export const setRefreshToken = (token) => {
  localStorage.setItem('REFRESH-TOKEN', token);
};

export const removeAccessToken = () => {
  localStorage.removeItem('ACCESS-TOKEN');
};

export const removeRefreshToken = () => {
  localStorage.removeItem('REFRESH-TOKEN');
};

export const getAccessToken = () => localStorage.getItem('ACCESS-TOKEN');

export const getRefreshToken = () => localStorage.getItem('REFRESH-TOKEN');
