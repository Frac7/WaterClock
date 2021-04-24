import React, { useState, useEffect, useMemo } from 'react';

import { Text, Button, Layout } from '@ui-kitten/components';

import { scheduleNotification } from '../utils';

const HOUR = 3600000; // One hour in ms
const SECOND = 1000;

const Clock = () => {
  const [intervalID, setIntervalID] = useState(null);
  const [timer, setTimer] = useState(false);
  const [difference, setDifference] = useState(HOUR); // Countdown

  const handleReset = () => {
    setDifference(HOUR);
    setTimer(prevTimer => !prevTimer);
    clearInterval(intervalID);
  };

  useEffect(() => {
    if (timer) {
      scheduleNotification(HOUR / SECOND);
      const id = setInterval(() => {
        setDifference(prevDifference => prevDifference - SECOND);
      }, SECOND);
      setIntervalID(id);
    }
  }, [timer]);

  useEffect(() => {
    if (!difference) {
      handleReset();
    }
  }, [difference]);

  const countdown = useMemo(() => new Date(difference).toISOString().slice(11, 19), [difference]);

  return (
    <Layout style={{flex: 1, justifyContent: 'space-around', alignItems: 'center', padding: 48}}>
      <Text category="h1">{countdown}</Text>
      <Button size="giant" onPress={handleReset}>{timer ? 'STOP' : 'START'}</Button>
    </Layout>
    );
}

export default Clock;