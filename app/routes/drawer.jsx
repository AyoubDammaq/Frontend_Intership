import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image, StyleSheet, View } from 'react-native';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


import Profile from '../Profile';
import Tasks from '../TasksScreen';
import Notes from '../NotesScreen';
import Settings from '../settings';
import Logout from '../Logout';
import TabNavigator from './tabs';

const Drawer = createDrawerNavigator();


const CustomDrawerLabel = () => (
    <View pointerEvents="none">
        <Image
            source={require('../../assets/memorise.png')}
            style={{ width: 200, height: 50 }}
        />
    </View>
);

const DrawerNavigator = () => {
    return (
    <Drawer.Navigator>
        <Drawer.Screen 
            name='Memorise' 
            component={ TabNavigator }
            options={{ 
                drawerLabel: CustomDrawerLabel,
                drawerItemStyle: styles.img,
                
            }}
            style = {styles.img}
        />
        <Drawer.Screen 
            name='Profile' 
            component={ Profile }
            options={{ 
                drawerLabel: 'Profile',
                drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='account' size={size} color={color}/>  
                ),
            }}
        />
        <Drawer.Screen 
            name='Notes' 
            component={ Notes }
            options={{ 
                drawerLabel: 'Notes',
                drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='notebook-edit' size={size} color={color}/>  
                ), 
            }}
        />
        <Drawer.Screen 
            name='Tasks' 
            component={ Tasks }
            options={{ 
                drawerLabel: 'Tasks',
                drawerIcon: ({ color, size }) => (
                    <FontAwesome5 name="tasks" size={size} color={color} />  
                ), 
            }}
        />
        
        <Drawer.Screen 
            name='Settings' 
            component={ Settings }
            options={{ 
                drawerLabel: 'Settings',
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="settings-sharp" size={size} color={color} />  
                ), 
            }}
        />
        <Drawer.Screen 
            name="LogOut"
            component={ Logout }
            options={{ 
                drawerLabel: 'Logout',
                drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='logout' color={color} size={size}/>
                ),
            }}
            />
    </Drawer.Navigator>
    )
}

export default DrawerNavigator


const styles = StyleSheet.create({
    img: {
        pointerEvents: 'none',
    }
})
