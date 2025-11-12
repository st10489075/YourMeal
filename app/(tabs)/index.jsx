import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const COURSES = ["Starter", "Starter", "Starter", "Main", "Main", "Main", "Dessert", "Dessert", "Dessert"];

const mealName = ["Chicken Wings","Prawn Cocktail","Greek Salad","Beef Steak","Grilled Chicken","Spaghetti Bolognese",
  "Cheesecake","Ice Cream","Fruit Salad"];

const description = ["Caramel wings with a spicy glaze","Fresh prawns in a tangy cocktail sauce","Feta, olives, cucumber, tomato, onion",
  "Juicy grilled beef steak cooked to your liking","Herb-marinated grilled chicken breast","Classic spaghetti with rich meat sauce","Creamy cheesecake with a graham cracker crust",
  "Assorted ice cream scoops with toppings","Fresh seasonal fruits"];

const price = ["R50","R70","R40","R150","R120","R100","R60","R40","R30"
  
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedCourse, setSelectedCourse] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chef Christofell Menu</Text>
      <Text style={styles.avg}>Average Price: R45</Text>

      {/* Menu and Filter Buttons */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => navigation.navigate("MenuPage")}
        >
          <Text style={styles.btnText}>Go to Menu Page</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => setSelectedCourse("")}
        >
          <Text style={styles.btnText}>Show All Courses</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
     
      <View style={styles.buttonRow}>

        {selectedCourse === 'Starter Menu' && (
          <View>
            <Text>{mealName[0]}: {description[0]} - {price[0]}</Text>
            <Text>{mealName[1]}: {description[1]} - {price[1]}</Text>
            <Text>{mealName[2]}: {description[2]} - {price[2]}</Text>
          </View>
        )}

        {selectedCourse === 'Main Menu' && (
          <View>
            <Text>{mealName[3]}: {description[3]} - {price[3]}</Text>
            <Text>{mealName[4]}: {description[4]} - {price[4]}</Text>
            <Text>{mealName[5]}: {description[5]} - {price[5]}</Text>
          </View>
        )}

        {selectedCourse === 'Dessert Menu' && (
          <View>
            <Text>{mealName[6]}: {description[6]} - {price[6]}</Text>
            <Text>{mealName[7]}: {description[7]} - {price[7]}</Text>
            <Text>{mealName[8]}: {description[8]} - {price[8]}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  avg: { textAlign: 'center', marginBottom: 20, fontSize: 16 },
  mainBtn: {
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  btnText: { color: '#fff', fontWeight: '700' },
  menuContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  results: { alignItems: 'center' },
  note: { color: '#555', fontStyle: 'italic' },
});