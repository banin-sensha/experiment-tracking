export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key) => {
    return localStorage.getItem(key);
}

export const deleteFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}