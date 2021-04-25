import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    autoCancel: true,
  }),
});

export const scheduleNotification = async seconds =>
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Timeout!',
      body: 'It\'s time to drink some water! 🚰'
    },
    trigger: {
      seconds,
    }
  });

export const handleNotification = async (endTime, setNotificationId) => {
  const newNotificationID = await scheduleNotification(endTime);
  setNotificationId(newNotificationID);
}

export const cancelScheduledNotification = async id => await Notifications.cancelScheduledNotificationAsync(id);
