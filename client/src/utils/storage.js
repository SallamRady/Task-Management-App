
export function ClearStorage() {
    localStorage.clear();
}

export function setData(key, value) {
    localStorage.setItem(key, value);
}

export function getData(key) {
    return localStorage.getItem(key);
}

export function hasKey(key) {
    return (key in localStorage);
}