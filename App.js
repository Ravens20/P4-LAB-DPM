import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, ScrollView, Text, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import ChildComponent from './components/ChildComponent';
import ModalSelectTeam from './components/ModalSelectTeam';
import trophyImage from './assets/wc.png';
import Flag from 'react-native-flags';

const teams = [
  { name: "Indonesia", code: "ID" },
  { name: "Korea", code: "KR" },
  { name: "Brazil", code: "BR" },
  { name: "Argentina", code: "AR" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Spain", code: "ES" },
  { name: "Portugal", code: "PT" },
  { name: "Japan", code: "JP" },
  { name: "Turkey", code: "TR" },
  { name: "Poland", code: "PL" },
  { name: "America", code: "US" },
];

const { width } = Dimensions.get('window');

export default function App() {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [teamA, setTeamA] = useState(teams[0]);
  const [teamB, setTeamB] = useState(teams[1]);
  const [modalVisible, setModalVisible] = useState(false);
  const [winnerModalVisible, setWinnerModalVisible] = useState(false);
  const [winner, setWinner] = useState(null);
  const [selectingTeam, setSelectingTeam] = useState(null);

  useEffect(() => {
    if (winner) {
      resetScores();
    }
  }, [winner]);

  const incrementScoreA = () => {
    if (scoreA < 10) {
      if (scoreA + 1 === 10) {
        setWinner(teamA);
        setWinnerModalVisible(true);
      }
      setScoreA(scoreA + 1);
    }
  };

  const decrementScoreA = () => {
    if (scoreA > 0) {
      setScoreA(scoreA - 1);
    }
  };

  const incrementScoreB = () => {
    if (scoreB < 10) {
      if (scoreB + 1 === 10) {
        setWinner(teamB);
        setWinnerModalVisible(true);
      }
      setScoreB(scoreB + 1);
    }
  };

  const decrementScoreB = () => {
    if (scoreB > 0) {
      setScoreB(scoreB - 1);
    }
  };

  const resetScores = () => {
    setScoreA(0);
    setScoreB(0);
  };

  const selectTeam = (setTeam) => {
    setSelectingTeam(() => setTeam);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Futsal Scoreboard</Text>
      <Image source={trophyImage} style={styles.trophyImage} />
      <Text style={styles.instructionText}>Tekan Box Untuk Mengganti Negara</Text>
      <View style={styles.scoreboard}>
        <TouchableOpacity onPress={() => selectTeam(setTeamA)} style={styles.teamBox}>
          <ChildComponent
            teamName={teamA.name}
            teamCode={teamA.code}
            score={scoreA}
            incrementScore={incrementScoreA}
            decrementScore={decrementScoreA}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectTeam(setTeamB)} style={styles.teamBox}>
          <ChildComponent
            teamName={teamB.name}
            teamCode={teamB.code}
            score={scoreB}
            incrementScore={incrementScoreB}
            decrementScore={decrementScoreB}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetScores}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <ModalSelectTeam
        visible={modalVisible}
        teams={teams}
        onSelect={(team) => {
          selectingTeam(team);
          setModalVisible(false);
        }}
        onClose={() => setModalVisible(false)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={winnerModalVisible}
        onRequestClose={() => setWinnerModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{winner?.name} Wins!</Text>
            <Flag code={winner?.code} size={64} style={styles.winnerFlag} />
            <TouchableOpacity style={styles.closeButton} onPress={() => setWinnerModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f5c400',
    textAlign: 'center',
  },
  trophyImage: {
    width: 120,
    height: 180,
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 18,
    color: '#f5c400',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 20,
  },
  teamBox: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    height: 250, // Adjusted height for better appearance
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#f5c400',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#1a1a1a',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#f5c400',
    fontSize: 18,
    textAlign: 'center',
  },
  winnerFlag: {
    marginVertical: 20,
  },
});
