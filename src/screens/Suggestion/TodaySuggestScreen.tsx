import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const TodaySuggestScreen: React.FC = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          Today's Suggestions
        </Text>
        <Text style={{ fontSize: 16, color: '#666' }}>
          Here you'll find personalized recipe suggestions for today based on your preferences and dietary needs.
        </Text>
      </View>
    </ScrollView>
  );
};

export default TodaySuggestScreen;
