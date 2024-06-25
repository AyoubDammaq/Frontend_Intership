import { StyleSheet, View, TouchableOpacity, ScrollView, Text, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { moderateScale } from 'react-native-size-matters';



const NotesScreen = ({ navigation }) => {

  const [choosenCategory, setChoosenCategory] = useState('');
  const [search, setSearch] = useState('');

  const categoryDetails = {
    Course: { color: "#FF7F50", icon: "shopping-cart", iconType: MaterialIcons },
    Divertissement: { color: "#9932CC", icon: "dice", iconType: FontAwesome5 },
    Travail: { color: "#1E90FF", icon: "work", iconType: MaterialIcons },
    "To-Do": { color: "#ff5050", icon: "clipboard-list-outline", iconType: MaterialCommunityIcons },
    Sport: { color: "#008B8B", icon: "run", iconType: MaterialCommunityIcons },
    Projet: { color: "#BDB76B", icon: "projector-screen-outline", iconType: MaterialCommunityIcons },
    Personnel: { color: "#FF69B4", icon: "face-man-shimmer", iconType: MaterialCommunityIcons },
    Santé: { color: "#00b377", icon: "hand-holding-heart", iconType: FontAwesome5 },
  };

  
  const handlePress = (choosenCategory) => {
    const details = categoryDetails[choosenCategory];
    setChoosenCategory(choosenCategory);
    navigation.navigate('ListOfNotesScreen', { choosenCategory: choosenCategory, ...details });
  };

  const searchNote = () => {

  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-sharp" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Note"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={[styles.itemContainer, styles.itemLeft]} onPress={() => handlePress('Course')}>
            <FontAwesome5 name="folder-minus" size={60} color="#FF7F50" style={styles.folderIcon} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Course</Text>
              <Text style={styles.itemTextNote}>0 notes</Text>
            </View>
            <TouchableOpacity onPress={() => handleMorePress(category)} style={styles.moreIcon}>
                <MaterialIcons name="more-vert" size={24} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.itemContainer, styles.itemRight]} onPress={() => handlePress('Divertissement')}>
            <FontAwesome5 name="folder-minus" size={60} color="#9932CC" style={styles.folderIcon} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Divertissement</Text>
              <Text style={styles.itemTextNote}>0 notes</Text>
            </View>
            <TouchableOpacity onPress={() => handleMorePress(category)} style={styles.moreIcon}>
                <MaterialIcons name="more-vert" size={24} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={[styles.itemContainer, styles.itemLeft]} onPress={() => handlePress('Travail')}>
            <FontAwesome5 name="folder-minus" size={60} color="#1E90FF" style={styles.folderIcon} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Travail</Text>
              <Text style={styles.itemTextNote}>0 notes</Text>
            </View>
            <TouchableOpacity onPress={() => handleMorePress(category)} style={styles.moreIcon}>
                <MaterialIcons name="more-vert" size={24} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.itemContainer, styles.itemRight]} onPress={() => handlePress('To-Do')}>
            <FontAwesome5 name="folder-minus" size={60} color="#ff5050" style={styles.folderIcon} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>To-Do</Text>
              <Text style={styles.itemTextNote}>0 notes</Text>
            </View>
            <TouchableOpacity onPress={() => handleMorePress(category)} style={styles.moreIcon}>
                <MaterialIcons name="more-vert" size={24} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={[styles.itemContainer, styles.itemLeft]} onPress={() => handlePress('Sport')}>
            <FontAwesome5 name="folder-minus" size={60} color="#008B8B" style={styles.folderIcon} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Sport</Text>
              <Text style={styles.itemTextNote}>0 notes</Text>
            </View>
            <TouchableOpacity onPress={() => handleMorePress(category)} style={styles.moreIcon}>
                <MaterialIcons name="more-vert" size={24} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.itemContainer, styles.itemRight]} onPress={() => handlePress('Projet')}>
            <FontAwesome5 name="folder-minus" size={60} color="#BDB76B" style={styles.folderIcon} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Projet</Text>
              <Text style={styles.itemTextNote}>0 notes</Text>
            </View>
            <TouchableOpacity onPress={() => handleMorePress(category)} style={styles.moreIcon}>
                <MaterialIcons name="more-vert" size={24} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={[styles.itemContainer, styles.itemLeft]} onPress={() => handlePress('Personnel')}>
            <FontAwesome5 name="folder-minus" size={60} color="#FF69B4" style={styles.folderIcon} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Personnel</Text>
              <Text style={styles.itemTextNote}>0 notes</Text>
            </View>
            <TouchableOpacity onPress={() => handleMorePress(category)} style={styles.moreIcon}>
                <MaterialIcons name="more-vert" size={24} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.itemContainer, styles.itemRight]} onPress={() => handlePress('Santé')}>
            <FontAwesome5 name="folder-minus" size={60} color="#00b377" style={styles.folderIcon} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>Santé</Text>
              <Text style={styles.itemTextNote}>0 notes</Text>
            </View>
            <TouchableOpacity onPress={() => handleMorePress(category)} style={styles.moreIcon}>
              <MaterialIcons name="more-vert" size={24} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButtonContainer} onPress={() => navigation.navigate('addNoteScreen')}>
        <Ionicons name="add-circle" style={styles.addButton} />
      </TouchableOpacity>
    </View>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1
  },
  searchBar: {
    flex: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 35,
    paddingLeft: 40,
    height: 40,
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 15,
    padding: 16,
    height: 130,
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    position: 'relative',
  },
  itemLeft: {
    marginRight: 8,
  },
  itemRight: {
    marginLeft: 8,
  },
  folderIcon: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  moreIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  textContainer: {
    position: 'absolute',
    left: 20,
    bottom: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  itemTextNote: {
    fontSize: 14,
    color: 'gray',
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
});