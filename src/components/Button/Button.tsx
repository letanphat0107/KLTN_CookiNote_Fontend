import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  style,
  textStyle
}) => {
  const getButtonStyle = () => {
    let baseStyle: any[] = [styles.button];
    
    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryButton);
        break;
      case 'outline':
        baseStyle.push(styles.outlineButton);
        break;
      case 'danger':
        baseStyle.push(styles.dangerButton);
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallButton);
        break;
      case 'large':
        baseStyle.push(styles.largeButton);
        break;
      default:
        baseStyle.push(styles.mediumButton);
    }
    
    // Full width
    if (fullWidth) {
      baseStyle.push(styles.fullWidthButton);
    }
    
    // Disabled state
    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }
    
    // Custom style
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    let baseStyle: any[] = [styles.buttonText];
    
    // Variant text styles
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryButtonText);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryButtonText);
        break;
      case 'outline':
        baseStyle.push(styles.outlineButtonText);
        break;
      case 'danger':
        baseStyle.push(styles.dangerButtonText);
        break;
    }
    
    // Size text styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallButtonText);
        break;
      case 'large':
        baseStyle.push(styles.largeButtonText);
        break;
      default:
        baseStyle.push(styles.mediumButtonText);
    }
    
    // Disabled text style
    if (disabled) {
      baseStyle.push(styles.disabledButtonText);
    }
    
    // Custom text style
    if (textStyle) {
      baseStyle.push(textStyle);
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity 
      style={getButtonStyle()} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Variant styles
  primaryButton: {
    backgroundColor: '#FF6B6B',
  },
  secondaryButton: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  dangerButton: {
    backgroundColor: '#F44336',
  },
  
  // Size styles
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  mediumButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  largeButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  
  // Full width
  fullWidthButton: {
    width: '100%',
  },
  
  // Disabled
  disabledButton: {
    backgroundColor: '#E0E0E0',
    borderColor: '#E0E0E0',
  },
  
  // Text styles
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // Variant text styles
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#333333',
  },
  outlineButtonText: {
    color: '#FF6B6B',
  },
  dangerButtonText: {
    color: '#FFFFFF',
  },
  
  // Size text styles
  smallButtonText: {
    fontSize: 14,
  },
  mediumButtonText: {
    fontSize: 16,
  },
  largeButtonText: {
    fontSize: 18,
  },
  
  // Disabled text
  disabledButtonText: {
    color: '#999999',
  },
});

export default Button;
