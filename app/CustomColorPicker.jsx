import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const customColors = [
  '#fff9d7', // Custom Color 1
  '#f1eb9c', // Custom Color 2
  '#d9ea9a', // Custom Color 3
  '#a5dfd3', // Similar Color 1
  '#B1D0C6', // Similar Color 6
  '#a4dbe8', // Similar Color 2
  '#94BFD0', // Similar Color 5
  '#c5b4e3', // Similar Color 3
  '#9595d2', // Similar Color 4
  '#D8C7A4', // Similar Color 7
  '#cac7a7', // Similar Color 9
  '#faaa8d', // Similar Color 8
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
