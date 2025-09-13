import { StyleSheet } from 'react-native';

export const culinaryStoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    color: '#333333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  storyCard: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  storyContent: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});
