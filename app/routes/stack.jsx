import { StyleSheet, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'

import DrawerNavigator from './drawer';
import AddNoteScreen from '../addNoteScreen';
import Notes from '../NotesScreen';
import Login from '../login';
import Register from '../register';
import ListOfNotesScreen from '../ListOfNotesScreen';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';



const Stack = createNativeStackNavigator();

const StackNavigator  = () => {
    return (
    <Stack.Navigator 
        screenOptions={{ 
            headerShown: false, 
        }}
        >
        
        <Stack.Screen name='DrawerNavigator' component={ DrawerNavigator }/>
        <Stack.Screen 
            name='addNoteScreen' 
            component={ AddNoteScreen } 
            options={{
                headerShown: true,
                headerTitle: 'Add Note',
                headerRight: () => (
                    <TouchableOpacity>
                        <SimpleLineIcons name="options-vertical" size={24} color="black" />
                    </TouchableOpacity>
                    ),
                
                }}/>
        <Stack.Screen name='NotesScreen' component={ Notes }/>
        <Stack.Screen 
            name='ListOfNotesScreen' 
            component={ ListOfNotesScreen }
            options={{
                headerShown: true,
            }}
            />
    </Stack.Navigator>
    )
}

export default StackNavigator 

const styles = StyleSheet.create({})