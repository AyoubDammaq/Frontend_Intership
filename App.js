import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';

import StackNavigator from './app/routes/stack';

export default function App() {
  

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
