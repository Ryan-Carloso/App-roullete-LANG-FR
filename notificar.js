import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

function Notificar() {
  const bodytext = [
    'Le jeu de la roulette !',
    'Une journée parfaite pour gagner !',
    'Je veux gagner !',
    'Le jeu qui paie les loyers !',
    'Recevez un bonus sur votre premier dépôt !',
    'Inscrivez-vous et commencez à jouer !',
  ];
  const Nometext = ['Martin', 'Thomas', 'Bernard', 'Louise', 'Richard', 'Rose', 'Chloé', 'Petit'];

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Permission for notifications not granted!');
        return;
      }

      // Set the notification handler to handle notifications when they are received
      Notifications.setNotificationHandler({
        handleNotification: async (notification) => {
          // This function will be called when a notification is received
          console.log('Received notification - Title:', notification.request.content.title);
          console.log('Received notification - Body:', notification.request.content.body);
          // Add more specific properties as needed
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          };
        },
      });

      // Schedule the notifications to be sent every 9:30 hours (9 hours * 60 minutes * 60 seconds * 1000 milliseconds)
      const notificationInterval = (9 * 60 + 30) * 60 * 1000;
      setInterval(() => {
        sendNotification("Le jeu de la Roulette !", getRandomMessage1());
        sendNotification(getRandomtitle(), getRandomMessage2());
        sendNotification(getRandomtitle(), getRandomMessage3());
        sendNotification(getRandomtitle(), getRandomMessage4());
      }, notificationInterval);
    }

    registerForPushNotificationsAsync();
  }, []);

  async function sendNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: true,
      },
      trigger: null, // Trigger is set to null to send the notification immediately
    });

    console.log('Notification sent!');
  }

  function getRandomtitle() {
    const randomString = bodytext[Math.floor(Math.random() * bodytext.length)];
    return randomString;
  }

  function getRandomMessage1() {
    const randomNumber = generateRandomNumber();
    const Nome = Nometext[Math.floor(Math.random() * Nometext.length)];
    return Nome + " a gagné " + randomNumber + " € en jouant aujourd'hui à ce jeu ! Faites un dépôt et obtenez un bonus de 100 % !";
  }
  function getRandomMessage2() {
    const randomNumber1 = generateRandomNumber1();
    const randomEuros2x = generateEuros2x();
    return "Aujourd'hui, un total de " + randomNumber1 + " gagné " + randomEuros2x + "€ en jouant à ce jeu ! Cliquez ici et jouez aussi !";
  }
  function getRandomMessage3() {
    const randomNumber1 = generateRandomNumber();
    return "Cliquez ici pour vous inscrire aujourd'hui au jeu et recevez un bonus de 100 % sur votre dépôt ! Aujourd'hui, un total de " + randomNumber1 + "€ gagnent avec ce jeu !";
  }
  function getRandomMessage4() {
    return "Inscrivez-vous aujourd'hui, cliquez ici pour commencer à gagner en jouant avec cette application ! Obtenez un bonus sur votre premier dépôt !";
  }

  function generateRandomNumber() {
    const min = 100;
    const max = 500;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function generateRandomNumber1() {
    const min = 40;
    const max = 150;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function generateEuros2x() {
    const min = 400;
    const max = 1500;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return null; // You can return any JSX here or just `null` if you don't want to render anything
}

export default Notificar;