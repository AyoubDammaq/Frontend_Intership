import { StyleSheet, TouchableOpacity, View, Text, SafeAreaView, TextInput,Alert, Modal, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';  
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import tinycolor from 'tinycolor2';
import CustomColorPicker from './CustomColorPicker';
import axios from 'axios';





const AddNoteScreen = ({ navigation }) => {


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitDate, setSubmitDate] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const [category, setcategory] = useState(0); 
    const [attachedMedia, setAttachedMedia] = useState(null);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [userId, setUserId] = useState(1);
    

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [color, setColor] = useState('#FF0000');


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await axios.get('http://192.168.200.105:3000/categories');
                const fetchedCategories = result.data || [];
                const validCategories = fetchedCategories.filter(category => category.categoryName);
                if (validCategories.length > 0) {
                    const dropdownCategories = validCategories.map(category => ({
                        label: category.categoryName,
                        value: category.idcategory
                    }));
                    setCategories(dropdownCategories);
                } else {
                    console.log('No categories are available... Please create a new category');
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    const onChangeDate = (event, submitDate) => {
        const currentDate = submitDate || date;
        setShowDatePicker(false);
        setSubmitDate(currentDate);
    };


    const handleCategoryChange = (item) => {
        setcategory(item.value);
        setValue(item.value);
        setIsFocus(false);
    };

    const handleColorChange = (color) => {
        const hexColor = tinycolor(color).toHexString();
        setColor(hexColor);
    };

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: '#3498db' }]}>
                    Category
                </Text>
            );
        }
        return null;
    };

    const selectattachedMedia = async () => {
        try {
            const doc = await DocumentPicker.getDocumentAsync({});
            if (doc && doc.assets && doc.assets.length > 0) {
                console.log(doc.assets[0].name);
                setAttachedMedia(doc.assets[0]);
            } else {
                console.log('No document selected or invalid format');
            }
        } catch (error) {
            console.log('Error during document selection:', error.message);
            
        }
    }

    
    const addNote = async () => {

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('submitDate', submitDate);
        formData.append('userId', 1); 
        formData.append('color', color);
        formData.append('idCategory', category);
        if (attachedMedia) {
            formData.append('attachedMedia', {
                uri: attachedMedia.uri,
                name: attachedMedia.name,
                type: attachedMedia.mimeType,
            });
        }

        if(!title || !description || !submitDate || !category){
            Alert.alert('Please enter note details');
        }else{
            const response = await axios.post('http://192.168.200.105:3000/note/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response){
                console.log('Note added successfully');
                navigation.navigate('Notes');
    
                setTitle('');
                setDescription('');
                setcategory(null);
                setAttachedMedia(null);
                setDate(new Date());
                setUserId(1);
            }else{
                Alert.alert('Error', response.note.message || 'Something went wrong!');
            }
        }

    };
    return (
    <SafeAreaView style={styles.container}>
        <TextInput 
            value={title} 
            placeholder='Title'
            style={styles.titlePlaceholder}
            onChangeText={setTitle}
            multiline
            numberOfLines={2}
            maxLength={50}>
        </TextInput>
        <TouchableOpacity style={styles.alarm_plus} onPress={() => setShowDatePicker(true)}>
            <MaterialCommunityIcons 
                name='alarm-plus' 
                size={24} 
                color="gray"
                
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pin} >
            <AntDesign name="pushpino" size={24} color="gray" />
        </TouchableOpacity>
        <CustomColorPicker selectedColor={color} onColorSelected={handleColorChange} />
        <View style={styles.descriptionContainer}>
            <TextInput 
                value={description} 
                placeholder='Description'
                onChangeText={setDescription}
                style={styles.description}
                multiline
            />
            <TouchableOpacity onPress={selectattachedMedia} style={styles.attachFile}>
            <MaterialIcons name="attach-file" size={24} color='gray' />
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#3498db' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={categories}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select category' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={handleCategoryChange}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? '#3498db' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />
        </View>
        <View style={styles.selectedInfoContainer}>
            {attachedMedia && (
                    <Text style={styles.fileName}>Attached File: {attachedMedia.name}</Text>
                )}
            <Text style={styles.selectedInfoText}>Selected Date: {submitDate.toLocaleDateString()}</Text>
        </View>
        <TouchableOpacity style={styles.addNoteButton} onPress={addNote}>
            <Text style={styles.buttonText}>Add Note</Text>
        </TouchableOpacity>
        {showDatePicker && (
            <DateTimePicker
                value={date}
                mode='date'
                display='default'
                onChange={onChangeDate}
            />
        )}
        
    </SafeAreaView>
    )
}


export default AddNoteScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    titlePlaceholder: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
        paddingBottom: 5,
    },
    description: {
        height: 200,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        textAlignVertical: 'top',
    },
    attachFile: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    alarm_plus: {
        position: 'absolute',
        top: 30,
        right: 50,
    },
    pin: {
        position: 'absolute',
        top: 30,
        right: 15,
        transform: [{ rotateY: '180deg' }],
    },
    color: {
        position: 'absolute',
        top: 30,
        right: 80,
    },
    dropdownContainer: {
        marginTop: 20,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    addNoteButton: {
        backgroundColor: '#3498db',
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    submitDateText: {
        marginTop: 20,
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    colorContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorPreview: {
        width: '80%',
        height: 50,
        marginBottom: 20,
        textAlign: 'center',
        lineHeight: 50,
        color: '#FFF',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    colorPicker: {
        width: '80%',
    },
})