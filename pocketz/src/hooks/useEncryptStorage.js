import { useState } from 'react'
var CryptoJS = require("crypto-js");

const PASSWORD_KEY = "test pass";

function useEncryptStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      var bytes = CryptoJS.AES.decrypt(item, PASSWORD_KEY);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      // Parse stored json or if none return initialValue
      return item ? decryptedData : initialValue;
    } catch (error) {
      // If error also return initialValue
      if (error.message !== "Malformed UTF-8 data") {
        console.log(error.message);
        return initialValue;
      }
      else {
        console.log("ok i'm here");
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(valueToStore).toString(),
        PASSWORD_KEY
      );
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, data);
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export default useEncryptStorage