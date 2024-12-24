import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native';
import Flag from 'react-native-flags';

const { width, height } = Dimensions.get('window');

const ModalSelectTeam = ({ visible, teams, onSelect, onClose }) => {
  const renderTeamItem = ({ item }) => (
    <TouchableOpacity style={styles.teamItem} onPress={() => onSelect(item)}>
      <Flag code={item.code} size={48} />
      <Text style={styles.teamItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Team</Text>
          <FlatList
            data={teams}
            renderItem={renderTeamItem}
            keyExtractor={(item) => item.name}
            numColumns={2}
            columnWrapperStyle={styles.teamItemRow}
            contentContainerStyle={styles.flatListContent}
            style={styles.flatList}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: height * 0.8, // Limit the height of the modal
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
  flatList: {
    flexGrow: 0, // Prevent the FlatList from growing indefinitely
  },
  flatListContent: {
    alignItems: 'center',
  },
  teamItem: {
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    width: (width * 0.4) - 30,
  },
  teamItemRow: {
    justifyContent: 'space-between',
  },
  teamItemText: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
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
});

export default ModalSelectTeam;
