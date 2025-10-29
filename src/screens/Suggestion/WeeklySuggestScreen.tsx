import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const WeeklySuggestScreen: React.FC = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          Weekly Suggestions
        </Text>
        <Text style={{ fontSize: 16, color: '#666' }}>
          Plan your week with these curated recipe suggestions. Perfect for meal prep and weekly planning.
        </Text>
      </View>
    </ScrollView>
  );
};

export default WeeklySuggestScreen;
