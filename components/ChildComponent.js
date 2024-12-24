import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Flag from 'react-native-flags';

const ChildComponent = ({ teamName, teamCode, score, incrementScore, decrementScore }) => {
  return (
    <View style={styles.container}>
      <Flag code={teamCode} size={64} style={styles.teamImage} />
      <Text style={styles.teamName}>{teamName}</Text>
      <Text style={styles.score}>{score}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.incrementButton]} onPress={incrementScore}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.decrementButton]} onPress={decrementScore}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: '100%', // Ensure it fits within the fixed size
    justifyContent: 'space-between', // Ensure buttons are visible
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#f5c400',
    textAlign: 'center',
  },
  score: {
    fontSize: 48,
    marginVertical: 5,
    color: '#f5c400',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  incrementButton: {
    backgroundColor: '#4CAF50',
  },
  decrementButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default ChildComponent;
