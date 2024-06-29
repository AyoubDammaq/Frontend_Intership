import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const customColors = [
  '#fce300', // Custom Color 1
  '#FF7F50', // Similar Color 8
  '#BDB76B', // Similar Color 2
  '#a9c23f', // Custom Color 2
  '#00b377', // Similar Color 1
  '#008B8B', // Similar Color 5
  '#00a9e0', // Custom Color 3
  '#1E90FF', // Similar Color 7
  '#9932CC', // Similar Color 9
  '#c5b4e3', // Similar Color 3
  '#FF69B4', // Similar Color 6
  '#f26c5d', // Similar Color 4
];

const CustomColorPicker = ({ selectedColor, onColorSelected }) => {
    return (
        <View style={styles.colorPickerContainer}>
        {customColors.map((color, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    styles.colorButton,
                    { backgroundColor: color },
                    color === selectedColor ? styles.selectedColor : null
                ]}
                onPress={() => onColorSelected(color)}
            />
        ))}
        </View>
    );
};

const styles = StyleSheet.create({
    colorPickerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10,
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 5,
        borderWidth: 1,
        borderColor: '#000',
    },
    selectedColor: {
        borderWidth: 2, 
        borderColor: "black"
    },
});

export default CustomColorPicker;
