import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Screen dimensions
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 50,
};

// Common sizes
export const SIZES = {
  header: 60,
  tabBar: 80,
  button: 48,
  input: 48,
  icon: 24,
  avatar: 40,
};
