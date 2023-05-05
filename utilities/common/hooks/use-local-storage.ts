import { useState, useEffect } from "react";

const useLocalStorage = <T extends unknown>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [data, setData] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
  }, [data, key]);

  const setLocalStorage = (value: T) => setData(value);

  return [data, setLocalStorage];
};

export default useLocalStorage;
