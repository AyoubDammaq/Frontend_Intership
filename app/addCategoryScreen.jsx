import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native'
import React,  { useState }  from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ColorPicker } from 'react-native-color-picker';
import axios from 'axios';


const addCategoryScreen = ({ modalVisible, closeModel }) => {
    const [categoryName, setcategory] = useState('');
    const [isFocusable, setIsFocusable] = useState(false);
    const [categoryColor, setCategoryColor] = useState('#FF0000');
    const [errorMessage, setErrorMessage] = useState('');

    

    const handleFocus = () => {
        setIsFocusable(true);
    };

    const handleBlur = () => {
        setIsFocusable(false);
    };

    const handleColorChange = (color) => {
        setCategoryColor(color);
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
            console.log(newCatgory.categoryColor);
            console.log('Category added successfully');
            setErrorMessage('');
            closeModel();
        }
        } catch (error) {
        console.log(error);
        }
    };  
    return (
        <View style={styles.container}>
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View>
                    <TouchableOpacity style={styles.quitButton} onPress={closeModel}>
                        <FontAwesome6 name="xmark" size={24} color="black" />
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
                    <View style={styles.colorPickerContainer}>
                    <Text style={styles.colorPickerLabel}>Select Color:</Text>
                    <ColorPicker
                        style={styles.colorPicker}
                        hideSliders={true} 
                        onColorChange={handleColorChange}
                        onColorSelected={handleColorChange}
                    />
                    </View>
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
    )
}

export default addCategoryScreen

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
    }, 
    colorPickerContainer: {
        alignItems: 'center',
        marginBottom: 20,
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
    
});