import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const Home = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButtonContainer}>
        <FontAwesome5 name="pen" style={styles.addButton} />
      </TouchableOpacity>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButton: {
    fontSize: 24,
    color: 'gray',
  },
});