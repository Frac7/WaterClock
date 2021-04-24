import React, { useState, useEffect, useMemo } from 'react';

import { Text, Button, Layout } from '@ui-kitten/components';

const HOUR = 3600000; // One hour in ms
const SECOND = 1000;

const Clock = () => {
  const [intervalID, setIntervalID] = useState(null);
  const [timer, setTimer] = useState(false);
  const [difference, setDifference] = useState(HOUR); // Countdown

  const handleReset = () => { // Reset
    setDifference(HOUR);
    setTimer(prevTimer => !prevTimer);
    clearInterval(intervalID);
  };

  useEffect(() => {
    if (timer) {
      const id = setInterval(() => {
        if (difference > 0) {
          setDifference(prevDifference => prevDifference - SECOND);
        } else {
          handleReset();
        }
      }, SECOND); // Update every second when time has been started
      setIntervalID(id);
    }
  }, [timer]);

  const countdown = useMemo(() => new Date(difference).toISOString().slice(11, 19), [difference]);

  return (
    <Layout style={{flex: 1, justifyContent: 'space-around', alignItems: 'center', padding: 48}}>
      <Text category="h1">{countdown}</Text>
      <Button size="giant" onPress={handleReset}>{timer ? 'STOP' : 'START'}</Button>
    </Layout>
    );
}

export default Clock;