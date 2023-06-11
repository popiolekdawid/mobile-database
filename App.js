import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Appbar, Menu, Divider, PaperProvider } from 'react-native-paper';
import { initDatabase, fetchPhones, insertPhone, deleteAllPhones } from './database/db';

export default function App() {
  const [phones, setPhones] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  useEffect(() => {
    initDatabase();
    fetchPhoneData();
  }, []);

  const fetchPhoneData = () => {
    fetchPhones(phonesData => {
      setPhones(phonesData);
    });
  };

  const addPhone = () => {
    insertPhone('Samsung', 'Galaxy S20', 'Android 11', 'https://www.samsung.com');
    insertPhone('Google', 'Pixel 5', 'Android 12', 'https://store.google.com');
    fetchPhoneData();
  };

  const removeAllPhones = () => {
    deleteAllPhones();
    fetchPhoneData();
  };

  const renderPhoneItem = ({ item }) => (
    <View style={styles.phoneItem}>
      <Text>{item.manufacturer}</Text>
      <Text>{item.model}</Text>
      <Text>{item.androidVersion}</Text>
      <Text>{item.websiteURL}</Text>
    </View>
  );

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Phone Database" />
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
        >
          <Menu.Item onPress={addPhone} title="Add Phones" />
          <Menu.Item onPress={removeAllPhones} title="Delete All Phones" />
        </Menu>
      </Appbar.Header>
      <FlatList
        data={phones}
        renderItem={renderPhoneItem}
        keyExtractor={item => item.id.toString()}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#3498DB',
  },
  toolbarTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  toolbarButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  phoneItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
