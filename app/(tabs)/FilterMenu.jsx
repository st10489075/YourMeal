import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const COURSES = [
  "Starter", "Starter", "Starter","Starter", "Starter", "Starter",
  "Main", "Main", "Main","Main", "Main", "Main",
  "Dessert", "Dessert", "Dessert","Dessert", "Dessert", "Dessert",
];

const mealName = [
  "Chicken Wings","Prawn Cocktail","Greek Salad",'Mini Quiche','Garlic Bread','Tomato Soup',
  "Beef Steak","Grilled Chicken","Spaghetti Bolognese",'Lasagna','Grilled Salmon', 'Chicken Alfredo Pasta',
  "Cheesecake","Ice Cream","Fruit Salad","Creme Brulee", "Apple pie","Mousse",
];

const description = [
  "Caramel wings with a spicy glaze","Fresh prawns in a tangy cocktail sauce","Feta, olives, cucumber, tomato, onion",
  "Mini quiches with assorted fillings","Garlic bread with herbs","Creamy tomato soup with basil",
  "Juicy grilled beef steak cooked to your liking","Herb-marinated grilled chicken breast",
  "Classic spaghetti with rich meat sauce",
  "Lasagna layered with meat and cheese","Grilled salmon with lemon butter sauce",
  "Chicken Alfredo pasta in creamy sauce",
  "Creamy cheesecake with a graham cracker crust",
  "Assorted ice cream scoops with toppings",
  "Fresh seasonal fruits","Classic creme brulee with caramelized sugar",
  "Warm apple pie with cinnamon","Mousse with whipped cream topping"
];

const price = [
  "R50", "R70", "R40","R60", "R30", "R45",
  "R150", "R120", "R100","R130", "R160", "R140",
  "R60", "R40", "R30","R70", "R55", "R65"
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchText, setSearchText] = useState("");

  // Combine menu info into one array for easy filtering
  const menuItems = COURSES.map((course, index) => ({
    id: index.toString(),
    course,
    name: mealName[index],
    description: description[index],
    price: price[index],
  }));

  // Apply filters based on course & search input
  const filteredItems = menuItems.filter((item) => {
    const matchesCourse = selectedCourse ? item.course === selectedCourse : true;
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filter Menu Items</Text>
      

      {/* Search Input */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a dish..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Filter Buttons */}
      <View style={styles.buttonRow}>
        <Button title="All" onPress={() => setSelectedCourse("")} />
        <Button title="Starter" onPress={() => setSelectedCourse("Starter")} />
        <Button title="Main" onPress={() => setSelectedCourse("Main")} />
        <Button title="Dessert" onPress={() => setSelectedCourse("Dessert")} />
      </View>

      {/* Filtered Results */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.note}>No dishes found.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemName}>{item.name} - {item.price}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  avg: { textAlign: 'center', marginBottom: 16, fontSize: 16 },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  itemBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemDesc: {
    color: '#555',
  },
  note: { color: '#777', textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
});
