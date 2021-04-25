import React, { useState, useEffect, useMemo } from 'react';

import { Text, Button, Layout } from '@ui-kitten/components';

import { scheduleNotification, cancelScheduledNotification } from '../utils';

const HOUR = 3600000; // One hour in ms
const SECOND = 1000;

const Clock = () => {
  const [intervalID, setIntervalID] = useState(null);
  const [notificationId, setNotificationId] = useState(null);

  const [timer, setTimer] = useState(false);
  const [difference, setDifference] = useState(HOUR); // Countdown

  const handleReset = () => {
    setDifference(HOUR);
    setTimer(prevTimer => !prevTimer);

    cancelScheduledNotification(notificationId);
    clearInterval(intervalID);
  };

  useEffect(() => {
    if (timer) {
      const newNotificationID = scheduleNotification(HOUR / SECOND);
      setNotificationId(newNotificationID);

      const newIntervalID = setInterval(() => {
        setDifference(prevDifference => prevDifference - SECOND);
      }, SECOND);
      setIntervalID(newIntervalID);
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