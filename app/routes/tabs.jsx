import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Notifications from '../../app/notifications';
import Home from '../../app/home';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
    <Tab.Navigator>
        <Tab.Screen 
            name='Home' 
            component={ Home }
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
                headerShown: false,
            }}
        />
        <Tab.Screen 
            name='notifications'  
            component={ Notifications }
            options={{
                tabBarLabel: 'notification',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="bell" color={color} size={size} />
                ),
                headerShown: false,
            }}
        />
    </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({})