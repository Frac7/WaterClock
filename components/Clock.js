import React, { useState, useEffect, useMemo } from 'react';

import { Text, Button, Layout } from '@ui-kitten/components';

import { handleNotification, cancelScheduledNotification, HOUR, SECOND, normalizeDifference } from '../utils';

const Clock = () => {
  const [intervalID, setIntervalID] = useState(null);
  const [notificationId, setNotificationId] = useState(null);

  const [timer, setTimer] = useState(false);
  const [difference, setDifference] = useState(HOUR);

  const handleReset = () => {
    setDifference(HOUR);
    
    if (timer) {
      cancelScheduledNotification(notificationId);
      clearInterval(intervalID);
    }

    setTimer(prevTimer => !prevTimer);
  };

  useEffect(() => {
    if (timer) {
      handleNotification(HOUR / SECOND, setNotificationId);

      const newEndTime = new Date().getTime() + HOUR;
      const newIntervalID = setInterval(() => {
        const current = new Date().getTime();
        if (newEndTime > current) {
          const newDifference = normalizeDifference(newEndTime - current);
          setDifference(newDifference);
        } else {
          setDifference(0);
        }
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