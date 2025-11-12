import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ManageMenuScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [menu, setMenu] = useState(route.params?.existingMenu || []);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('');

  const addMeal = () => {
    if (!name.trim() || !price || !course.trim()) { 
      Alert.alert('Validation', 'Please fill in all fields');
      return;
    }

    const newMeal = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name,
      description,
      price: Number(price),
      course,
    };
    setMenu((prev) => [...prev, newMeal]);
    setName('');
    setDescription('');
    setPrice('');
    setCourse('');
  };

  const removeMeal = (id) => {
    Alert.alert('Confirm', 'Remove this dish?', [
      { text: 'Cancel' },
      {
        text: 'Remove',
        onPress: () => setMenu((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  // Go back and send menu data
  useEffect(() => {
    navigation.setParams({ menuItems: menu });
  }, [menu]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Manage Menu ({menu.length})</Text>

      <TextInput placeholder="Meal name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Description" style={styles.input} value={description} onChangeText={setDescription} />
      <TextInput placeholder="Price (number only)" style={styles.input} keyboardType="numeric" value={price} onChangeText={setPrice} />
      <TextInput placeholder="Course (Starter / Main / Dessert)" style={styles.input} value={course} onChangeText={setCourse} />

      <TouchableOpacity style={styles.addBtn} onPress={addMeal}>
        <Text style={styles.addBtnText}>Add Dish</Text>
      </TouchableOpacity>

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Text style={styles.mealName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>R{item.price} - {item.course}</Text>
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeMeal(item.id)}>
              <Text style={styles.removeBtnText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.doneBtn}
        onPress={() => navigation.navigate('Home', { menuItems: menu })}
      >
        <Text style={styles.doneBtnText}>Done</Text>
        
       {/* Back Button */}
       <TouchableOpacity
         style={styles.backBtn}
         onPress={() => navigation.goBack()}
       >
        
       </TouchableOpacity>
     
      </TouchableOpacity>
    </SafeAreaView>
    
  );
}

   


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 10,
  },
  addBtn: {
    backgroundColor: '#1e90ff', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20,
  },
  addBtnText: { color: '#fff', fontWeight: '700' },
  mealItem: {
    backgroundColor: '#f9f9f9', borderRadius: 10, padding: 10, marginBottom: 10,
  },
  mealName: { fontSize: 16, fontWeight: '600' },
  removeBtn: { backgroundColor: '#ff4d4d', padding: 6, borderRadius: 8, marginTop: 6, alignItems: 'center' },
  removeBtnText: { color: '#fff', fontWeight: '600' },
  doneBtn: { backgroundColor: '#228b22', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  doneBtnText: { color: '#fff', fontWeight: '700' },
});