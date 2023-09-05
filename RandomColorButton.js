import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';

const RandomColorButton = () => {
  const colors = ['1 ET 2 Douzaine', '2 ET 3 Douzaine', '1 ET 3 Douzaine', 'Noir', 'Rouge'];
  const cooldownDuration = 30; // Tempo de cooldown em segundos
  const [randomColor, setRandomColor] = useState(colors[0]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(cooldownDuration);

  useEffect(() => {
    let intervalId;

    if (isButtonDisabled) {
      intervalId = setInterval(() => {
        setCooldownSeconds((prevSeconds) => {
          if (prevSeconds === 1) {
            setIsButtonDisabled(false);
            clearInterval(intervalId);
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isButtonDisabled]);

  const handlePress = () => {
    if (!isButtonDisabled) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      setRandomColor(colors[randomIndex]);
      setIsButtonDisabled(true);
      setCooldownSeconds(cooldownDuration);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.buttonText1}>Jeu : XXX Lightning Roulette</Text>
      <Text style={styles.buttonText}>Jeu gagnante : {randomColor}</Text>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.fundobutton, isButtonDisabled ? styles.disabledButton : null]}
        disabled={isButtonDisabled}
      >
        <Text style={styles.button}>Prochain jeu !</Text>
      </TouchableOpacity>
      {isButtonDisabled && (
        <View style={styles.cooldownContainer}>
          <Text style={styles.cooldownText}>ATTENDEZ {cooldownSeconds} SECONDES</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    marginTop: 10, // Margem superior para posicionar abaixo do topo da tela
  },
  buttonText1: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fundobutton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: 'gray',
    // Remova o paddingVertical e paddingHorizontal para manter o mesmo tamanho do botão habilitado.
    // paddingVertical: 12,
    // paddingHorizontal: 24,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cooldownContainer: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cooldownText: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default RandomColorButton;