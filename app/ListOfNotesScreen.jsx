import { StyleSheet, Text, View, ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
const moment = require('moment');



const ListOfNotesScreen = ({ route }) => {
    const { choosenCategory, color, icon, iconType: IconType } = route.params;
    console.log(choosenCategory);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);

    

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get('http://192.168.200.105:3000/notes');

                const fetchedNotes = res.data || [];

                const validNotes = fetchedNotes.filter(note => 
                    note.title && note.description && note.category == choosenCategory && note.submitDate 
                );

                if (validNotes.length > 0) {
                    setNotes(validNotes);
                } else {
                    setError('No valid notes found');
                    console.log('No valid notes found');
                }
            } catch (error) {
                setError('An error occurred during fetching notes');
                console.log('Error during fetching notes:', error.message);
            }
        };

        fetchNotes();
    }, []);


    const displayNotes = () => {
        if (notes.length === 0) {
            return <Text style={styles.text}>You have no notes</Text>;
        } else {
            const rows = [];
            for (let i = 0; i < notes.length; i += 2) {
            rows.push(
                <View key={i} style={styles.noteRow}>
                <View style={[styles.noteItem, { backgroundColor: notes[i].color}]}>
                    <Text style={styles.noteTitle}>{notes[i].title}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.noteDescription}>
                    {notes[i].description}
                    </Text>
                    <View style={styles.noteFooter}>
                    <Text style={styles.noteDate}>{moment(notes[i].submitDate).format('YYYY-MM-DD')}</Text>
                    {notes[i].attachedMedia && (
                        <MaterialIcons name="attach-file" size={20} color="gray" style={styles.attachIcon} />
                    )}
                    </View>
                </View>
                {i + 1 < notes.length && (
                    <View style={[styles.noteItem, { backgroundColor: notes[i].color}]}>
                    <Text style={styles.noteTitle}>{notes[i + 1].title}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.noteDescription}>
                        {notes[i + 1].description}
                    </Text>
                    <View style={styles.noteFooter}>
                        <Text style={styles.noteDate}>{moment(notes[i + 1].submitDate).format('YYYY-MM-DD')}</Text>
                        {notes[i + 1].attachedMedia && (
                        <MaterialIcons name="attach-file" size={20} color="gray" style={styles.attachIcon} />
                        )}
                    </View>
                    </View>
                )}
                </View>
            );
            }
            return rows;
        }
        };
    

    return (
    <View style={styles.container}>
        <ScrollView style={[styles.listOfNotes]}>
            {displayNotes()}
        </ScrollView>
    </View>
    )
}

export default ListOfNotesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    text: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginTop: 20,
    },
    noteRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    noteItem: {
        flex: 1,
        padding: 16,
        margin: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'space-between',
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    noteDescription: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    noteFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 8,
    },
    noteDate: {
        fontSize: 12,
        color: '#999',
    },
    attachIcon: {
        marginLeft: 10,
    },
}); 