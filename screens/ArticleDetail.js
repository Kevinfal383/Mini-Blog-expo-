import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ArticleDetail({ route, navigation }) {
  const { articleId } = route.params;
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${articleId}`);
        const commentsRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${articleId}/comments`);
        setArticle(articleRes.data);
        setComments(commentsRes.data);
        setLoading(false);
      } catch (err) {
        alert("Erreur de chargement");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.body}>{article.body}</Text>

      <Text style={styles.commentTitle}>Commentaires</Text>
      {comments.map(comment => (
        <View key={comment.id} style={styles.commentBox}>
          <Text style={styles.commentAuthor}>{comment.name}</Text>
          <Text>{comment.body}</Text>
          <Text style={styles.commentEmail}>{comment.email}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  commentTitle: {
    fontSize: 18,
    color: '#1e3a8a',
    marginBottom: 10,
    marginTop: 15,
    fontWeight: '600',
  },
  commentBox: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1e3a8a',
    marginBottom: 5,
  },
  commentEmail: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 5,
    fontStyle: 'italic',
  },
});
