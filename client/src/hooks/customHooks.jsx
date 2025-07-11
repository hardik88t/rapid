import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error); // Log error to console
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            // setStoredValue(valueToStore);

            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error); // Log error to console
        }
    };

    const removeValue = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(error); // Log error to console
        }
    };

    return [storedValue, setValue, removeValue];
};

export const useCustomFBToken = () => {

    const [storedValue, setValue, removeValue] = useLocalStorage('customToken', '');

    setTimeout(() => {
        removeValue();
    }, 10000)

    fetch('/api/auth/getfbtoken').then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data.customToken)
        setValue(data.customToken);
        // data.customToken
    })

    return [storedValue, removeValue];
}

export const useCookie = (cookieName) => {
    const [cookieValue, setCookieValue] = useState(null);

    useEffect(() => {
        const getCookie = () => {
            const cookies = document.cookie.split(';').map(cookie => cookie.trim().split('='));
            const cookie = cookies.find(cookie => cookie[0] === cookieName);
            if (cookie) {
                setCookieValue(cookie[1]);
            }
        };

        getCookie();
    }, [cookieName]);

    return cookieValue;
};

export const useDarkMode = () => {
    const [enabled, setEnabled] = useLocalStorage('dark-theme');
    const isEnabled = typeof enabled === 'undefined' && enabled;

    useEffect(() => {
        const className = 'dark';
        const bodyClass = window.document.body.classList;

        isEnabled ? bodyClass.add(className) : bodyClass.remove(className);
    }, [enabled, isEnabled]);

    return [enabled, setEnabled];
};
