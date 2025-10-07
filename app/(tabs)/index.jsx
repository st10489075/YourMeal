import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Button,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const COURSES = ["Starter", "Starter","Starter",
  "Main","Main","Main","Dessert","Dessert","Dessert"];

const mealName =["Chicken Wings","Prawn Cocktail","Greek Salad",
"Beef Steak","Grilled Chicken","Spaghetti Bolognese","Cheesecake","Ice Cream","Fruit Salad"];

const description = ["Caramel wings with a spicy glaze","Fresh prawns in a tangy cocktail sauce","Feta, olives, cucumber, tomato, onion",
"Juicy grilled beef steak cooked to your liking","Herb-marinated grilled chicken breast","Classic spaghetti with rich meat sauce","Creamy cheesecake with a graham cracker crust",
"Assorted ice cream scoops with toppings","Fresh seasonal fruits"];

const price = ["R50","R70","R40",
"R150","R120","R100","R60","R40","R30"];




export default function HomeScreen() {
  const navigation = useNavigation();
  
  // Meal state
  const [menu, setMenu] = useState([]); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCourse, setSelectedCourse] = useState("");

  // Add meal to the menu
  const addMeal = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter a meal name');
      return;
    }
    if (!price || isNaN(Number(price))) {
      Alert.alert('Validation', 'Please enter a valid price (numbers only)');
      return;
    }

    const newMeal = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: name.trim(),
      description: description.trim(),
      course: selectedCourse,
      price: Number(price),
    };

    setMenu((prev) => [...prev, newMeal]);

    // Reset form
    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chef's Menu ({menu.length})</Text>

      
        <View style={styles.form}>
          
          <TextInput
            placeholder="Meal name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Description (optional)"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { height: 80 }]}
            multiline
          />
          <TextInput
            placeholder="Price (e.g. R100)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addMeal}>
            <Text style={styles.addBtnText}>Add Dish</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <View style={styles.buttonRow}>
            <Button title="Starter" onPress={() => setSelectedCourse("Starter Menu") } />
            <Button title="Main" onPress={() => setSelectedCourse("Main Menu") } />
            <Button title="Dessert" onPress={() => setSelectedCourse("Dessert Menu") } />
          </View>

        {selectedCourse === 'Starter Menu' && (
          <View>
            <Text>
              {mealName[0]}: {description[0]} - {price[0]}
            </Text>
            <Text>
              {mealName[1]}: {description[1]} - {price[1]}
            </Text>
            <Text>
              {mealName[2]}: {description[2]} - {price[2]}
            </Text>
          </View>
        )}
        
        {selectedCourse === 'Main Menu' && (
          <View>
            <Text>
              {mealName[3]}: {description[3]} - {price[3]}
              
            </Text>

            <Text>
              {mealName[4]}: {description[4]} - {price[4]}
            </Text>
            <Text>
              {mealName[5]}: {description[5]} - {price[5]}
            </Text>
          </View>
        )}
        
        {selectedCourse === 'Dessert Menu' && ( 
          <View>
            <Text>
              {mealName[6]}: {description[6]} - {price[6]}
            </Text>
            <Text>
              {mealName[7]}: {description[7]} - {price[7]}
            </Text>
            <Text>
              
              {mealName[8]}: {description[8]} - {price[8]}
            </Text>
          </View>
        )}
        </View>

        
            


      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontWeight: '700' },
  courseRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  courseBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  courseText: { fontSize: 14 },
  mealsContainer:{
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonRow:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  filterContainer:{
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
