import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable, Text } from 'react-native';
interface Contact {
  id: string;
  name: string;
  phone: string;
  role: string;
}
const contacts: Contact[] = [
  { id: '1', name: 'Jean Dupont', phone: '06 12 34 56 78', role: 'Directeur RH' },
  { id: '2', name: 'Marie Martin', phone: '06 23 45 67 89', role: 'Chef de route' },
  { id: '3', name: 'Pierre Durant', phone: '06 34 56 78 90', role: 'Assistant Logistique' },
  { id: '4', name: 'Lucie Bernard', phone: '06 45 67 89 01', role: 'Coordinateur Sécurité' },
  { id: '5', name: 'Thomas Leroy', phone: '06 56 78 90 12', role: 'Responsable Technique' },
  { id: '6', name: 'Alice Dupuis', phone: '06 67 89 01 23', role: 'Responsable RH' },
  { id: '7', name: 'Bob Martin', phone: '06 78 90 12 34', role: 'Technicien de Surface' },
  { id: '8', name: 'Carla Garcia', phone: '06 89 01 23 45', role: 'Assistante Administrative' },
  { id: '9', name: 'David Dubois', phone: '06 90 12 34 56', role: 'Chargé de Mission' },
  { id: '10', name: 'Emma Lefevre', phone: '06 01 23 45 67', role: 'Directrice Générale' },
];
export default function HomeScreen() {
  const [visitedContacts, setVisitedContacts] = useState<string[]>([]);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const handlePress = (contactId: string, phone: string) => {
    setVisitedContacts((prev) => [...prev, contactId]);
    setIsBannerVisible(true);
    setTimeout(() => {
      setIsBannerVisible(false);
    }, 3000);
  };
  const renderContact = ({ item }: { item: Contact }) => {
    const isVisited = visitedContacts.includes(item.id);

    return (
      <View style={styles.row}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>{item.role}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, isVisited ? styles.visitedButton : styles.notVisitedButton]}
            onPress={() => handlePress(item.id, item.phone)}
          >
            <Text style={styles.buttonText}>
              {isVisited ? 'Appelé' : 'Appeler'}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Liste des contacts</Text>
      </View>

      {isBannerVisible && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Appel en cours...</Text>
        </View>
      )}

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}
const commonTextStyles = {
  fontSize: 14,
  color: '#000',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#1D3D47',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  infoContainer: {
    flex: 2,
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  role: {
    ...commonTextStyles,
    fontSize: 14,
    marginVertical: 4,
  },
  phone: commonTextStyles,
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  notVisitedButton: {
    backgroundColor: '#1E90FF',
  },
  visitedButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  banner: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    zIndex: 10, 
  },
  bannerText: {
    color: '#fff',
    fontSize: 16,
  },
});
