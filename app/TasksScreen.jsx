import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';


const Tasks = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButtonContainer}>
          <Ionicons name="add-circle" style={styles.addButton} />
      </TouchableOpacity>
    </View>
  )
}

export default Tasks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  addButton: {
    fontSize: 60, 
    color: '#007AFF', 
  },
})