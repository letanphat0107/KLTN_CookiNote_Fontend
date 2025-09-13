import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';

interface RecipeDetailScreenProps {
  route?: {
    params?: {
      recipeId?: string;
    };
  };
}

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({ route }) => {
  const recipeId = route?.params?.recipeId;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recipe Detail</Text>
      </View>
      <View style={styles.content}>
        <Text>Recipe ID: {recipeId || 'Not provided'}</Text>
        <Text style={styles.description}>
          This screen will display detailed information about a specific recipe.
        </Text>
      </View>
    </ScrollView>
  );
};

export default RecipeDetailScreen;
