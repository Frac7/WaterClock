import React, { useState, useEffect, useMemo } from 'react';

import { Text, Button, Layout } from '@ui-kitten/components';

import { handleNotification, cancelScheduledNotification } from '../utils';

// const HOUR = 3600000;
const HOUR = 10000;
const SECOND = 1000;

const Clock = () => {
  const [intervalID, setIntervalID] = useState(null);
  const [notificationId, setNotificationId] = useState(null);

  const [timer, setTimer] = useState(false);
  const [difference, setDifference] = useState(HOUR);

  const handleReset = () => {
    if (timer) {
      cancelScheduledNotification(notificationId);
      clearInterval(intervalID);
    }

    setDifference(HOUR);
    setTimer(prevTimer => !prevTimer);
  };

  useEffect(() => {
    if (timer) {
      const newEndTime = new Date().getTime() + HOUR;
      handleNotification(newEndTime / SECOND, setNotificationId);

      const newIntervalID = setInterval(() => {
        setDifference(newEndTime - new Date().getTime());
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

  console.log(notificationId);

  return (
    <Layout style={{flex: 1, justifyContent: 'space-around', alignItems: 'center', padding: 48}}>
      <Text category="h1">{countdown}</Text>
      <Button size="giant" onPress={handleReset}>{timer ? 'STOP' : 'START'}</Button>
    </Layout>
    );
}

export default Clock;