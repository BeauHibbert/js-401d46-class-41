import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, FlatList, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contacts, setContacts] = useState([]);

const getContacts = async () => {
  const access = await Contacts.requestPermissionsAsync();
  console.log(access);
  if (access.granted) {
    const contactsData = await Contacts.getContactsAsync();
    setContacts(contactsData.data);
  }
}

useEffect(() => {
  getContacts();
}, [])

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.title}>
        <Text>My Contacts</Text>
        </View>
        <View style={styles.title}>
          <FlatList
            data={contacts}
            keyExtractor={(contact) => contact.id}
            renderItem={({ item }) => <Button title={item.name} />}
          />
        </View>
      <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 4,
    alignItems: 'center',
  }
});
