import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ArticleList({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement");
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
  <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Détails', { articleId: item.id })}>
    <Text style={styles.itemText}>{item.title}</Text>
  </TouchableOpacity>
);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;

  return (
  <View style={styles.container}>
    <Text style={styles.title}>Liste des articles</Text>
    <FlatList
      data={articles}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  item: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: '#1e3a8a',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
});
