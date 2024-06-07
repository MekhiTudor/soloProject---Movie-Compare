export const setLocaleStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocaleStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err);
    return null;
  }
};
