import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';

const COURSES = ["Starter", "Starter", "Starter", "Main", "Main", "Main", "Dessert", "Dessert", "Dessert"];

const mealName = [
  "Chicken Wings",
  "Prawn Cocktail",
  "Greek Salad",
  "Beef Steak",
  "Grilled Chicken",
  "Spaghetti Bolognese",
  "Cheesecake",
  "Ice Cream",
  "Fruit Salad"
];

const description = [
  "Caramel wings with a spicy glaze",
  "Fresh prawns in a tangy cocktail sauce",
  "Feta, olives, cucumber, tomato, onion",
  "Juicy grilled beef steak cooked to your liking",
  "Herb-marinated grilled chicken breast",
  "Classic spaghetti with rich meat sauce",
  "Creamy cheesecake with a graham cracker crust",
  "Assorted ice cream scoops with toppings",
  "Fresh seasonal fruits"
];

const price = [
  "R50",
  "R70",
  "R40",
  "R150",
  "R120",
  "R100",
  "R60",
  "R40",
  "R30"
];

import { useNavigation } from '@react-navigation/native';

export default function FilterMenuScreen() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [Price, setPrice] = useState('');
  const navigation = useNavigation();
  

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const saved = await AsyncStorage.getItem('menu');
        if (saved) {
          const parsed = JSON.parse(saved);
          setMenu(parsed);
          setFilteredMenu(parsed);
        }
      } catch (err) {
        console.log('Error loading menu:', err);
      }
    };
    loadMenu();
  }, []);

  const applyFilters = () => {
    let filtered = menu;

    // Filter by course
    if (selectedCourse !== 'All') {
      filtered = filtered.filter(
        (item) =>
          item.course?.toLowerCase() === selectedCourse.toLowerCase()
      );
    }

    // Filter by name
    if (searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    if (Price) {
      filtered = filtered.filter((item) => item.price >= parseFloat(Price));
    }
   
    setFilteredMenu(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCourse, searchQuery, Price, menu]);

  const renderMeal = ({ item }) => (
    <View style={styles.mealItem}>
      <Text style={styles.mealName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>R{item.price} - {item.course}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      {/* Course Buttons */}
      <View style={styles.filterContainer}>
        {['All', 'Starter', 'Main', 'Dessert'].map((course) => (
          
          <TouchableOpacity
            key={course}
            style={[
              styles.filterBtn,
              selectedCourse === course && styles.activeFilterBtn,
            ]}
            onPress={() => setSelectedCourse(course)}
            
          >
            
            <Text
              style={[
                styles.filterText,
                selectedCourse === course && styles.activeFilterText,
              ]}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      

      {/* Search Inputs */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search by meal name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.priceRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder=" Price"
            keyboardType="numeric"
            value={Price}
            onChangeText={Price}
          />
          
        </View>
      </View>

      {/* Results */}
      {filteredMenu.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No dish found!
        </Text>
      ) : (
        <FlatList
          data={filteredMenu}
          keyExtractor={(item) => item.id}
          renderItem={renderMeal}
        />
      )}

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#1e90ff',
    borderRadius: 20,
  },
  filterText: { color: '#1e90ff', fontWeight: '600' },
  activeFilterBtn: { backgroundColor: '#1e90ff' },
  activeFilterText: { color: '#fff' },
  searchSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  mealName: { fontWeight: 'bold', fontSize: 16 },
  backBtn: {
    backgroundColor: '#228b22',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  backBtnText: { color: '#fff', fontWeight: '700' },
});
