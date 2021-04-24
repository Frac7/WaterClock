import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    autoCancel: true,
  }),
});

export const scheduleNotification = async seconds => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Timeout!',
      body: 'It\'s time to drink some water! 🚰'
    },
    trigger: {
      seconds,
    }
  });
}
