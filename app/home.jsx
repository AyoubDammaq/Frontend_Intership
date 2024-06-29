import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native'
import React,  { useState, useEffect }  from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MaterialIcons } from '@expo/vector-icons';
import { ColorPicker } from 'react-native-color-picker';
import tinycolor from 'tinycolor2';
import CustomColorPicker from './CustomColorPicker';
import axios from 'axios';


const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryName, setcategory] = useState('');
  const [idCategory, setid] = useState(0);
  const [isFocusable, setIsFocusable] = useState(false);
  const [categoryColor, setCategoryColor] = useState('#E6DFAF');
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const result = await axios.get('http://192.168.200.105:3000/categories');
      const fetchedCategories = result.data || [];
      const validCategories = fetchedCategories.filter(category => category.categoryName);
      if (validCategories.length > 0) {
        const dropdownCategories = validCategories.map(category => ({
          id: category.idcategory,
          name: category.categoryName,
          color: category.categoryColor,
        }));
        setCategories(dropdownCategories);
      } else {
        console.log('No categories are available... Please create a new category');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openModel = async () => {
    setModalVisible(true);
  };

  const closeModel = async () => {
    setModalVisible(false);
    setcategory('');
    setErrorMessage('');
    setCategoryColor('#E6DFAF');
  };

  const handleFocus = () => {
    setIsFocusable(true);
  };

  const handleBlur = () => {
    setIsFocusable(false);
  };

  const handlePress = (category) => {
    navigation.navigate('ListOfNotesScreen', {
      choosenCategory: category.name,
      color: category.color,
      idcategory: category.id 
    });
  };

  const handleColorChange = (color) => {
    const hexColor = tinycolor(color).toHexString();
    setCategoryColor(hexColor);
  };

  const handleMorePress = (category) => {
    console.log(`More options for category: ${category.name}`);
  };

  const addCategory = async () => {
    if (categoryName.trim() === '') {
      setErrorMessage('Category name cannot be empty');
      return;
    }

    const newCatgory = {
      categoryName, 
      categoryColor, 
    }

    try {
      const res = await axios.post('http://192.168.200.105:3000/category/add', newCatgory);
      if(res){
        console.log('Category added successfully');
        setErrorMessage('');
        fetchCategories(); 
        closeModel();
      }
    } catch (error) {
      console.log(error);
    }
  };  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.rowContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.itemContainer,
                index % 2 === 0 ? styles.itemLeft : styles.itemRight 
              ]}
              onPress={() => handlePress(category)}
            >
              <FontAwesome5 name="folder-minus" size={60} color={category.color} style={styles.folderIcon} />
              <View style={styles.textContainer}>
                <Text style={styles.itemText}>{category.name}</Text>
                <Text style={styles.itemTextNote}>0 notes</Text>
              </View>
              <TouchableOpacity onPress={() => handleMorePress(category)} style={styles.moreIcon}>
                <MaterialIcons name="more-vert" size={24} color="gray" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButtonContainer} onPress={openModel}>
        <FontAwesome5 name="pen" style={styles.addButton} />
      </TouchableOpacity>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <TouchableOpacity style={styles.quitButton} onPress={closeModel}>
                  <FontAwesome5 name="times" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.modalText}>New Category</Text>
              </View>
              <TextInput 
                style={[styles.modalTextInput]}
                underlineColorAndroid={ isFocusable ? '#2196F3' : 'gray'}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder='Enter category name'
                onChangeText={(text) => {
                  setcategory(text);
                  setErrorMessage('');
                }}
                value={categoryName}>
              </TextInput>
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}
              <CustomColorPicker selectedColor={categoryColor} onColorSelected={handleColorChange} />
              <TouchableOpacity
                style={[styles.button]}
                onPress={addCategory}>
                <Text style={styles.textStyle}>Add Now !</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalTextInput: {
    width: '100%',
    padding: 10,
    marginBottom: 0,
    borderRadius: 5,
  },
  colorPickerContainer: {
    alignItems: 'center',
  },
  colorPickerLabel: {
    marginBottom: 10,
    fontSize: 16,
  },
  colorPicker: {
    width: 200,
    height: 200,
  },
  quitButton: {
    position: 'absolute',
    top: -10,
    left: 130,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#F0F0F0',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
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
    height: 150,
  },
  itemLeft: {
    marginRight: '2%', 
  },
  itemRight: {
    marginLeft: '2%', 
  },
  folderIcon: {
    position: 'absolute',
    top: 10,
    left: 20,
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
  moreIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});