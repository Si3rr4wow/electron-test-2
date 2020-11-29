import { useState, useEffect } from 'react';

const useTime = (frequency: number) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, frequency);

    return () => {
      clearInterval(interval);
    };
  }, [frequency]);

  return time;
};

export default useTime;
