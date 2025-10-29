// src/components/FloatingButtons/FloatingButtonsContainer.tsx
import React, { useState } from "react";
import { View } from "react-native";
import ShoppingListButton from "./ShoppingListButton";
import AIChatButton from "./AIChatButton";
import { floatingStyles } from "./styles";

interface FloatingButtonsContainerProps {
  navigation?: any;
}

const FloatingButtonsContainer: React.FC<FloatingButtonsContainerProps> = ({
  navigation,
}) => {
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const handleShoppingListToggle = () => {
    if (isAIChatOpen) {
      setIsAIChatOpen(false);
    }
    setIsShoppingListOpen(!isShoppingListOpen);
  };

  const handleAIChatToggle = () => {
    if (isShoppingListOpen) {
      setIsShoppingListOpen(false);
    }
    setIsAIChatOpen(!isAIChatOpen);
  };

  return (
    <View style={floatingStyles.container}>
      <ShoppingListButton
        isOpen={isShoppingListOpen}
        onToggle={handleShoppingListToggle}
        navigation={navigation}
      />
      <AIChatButton
        isOpen={isAIChatOpen}
        onToggle={handleAIChatToggle}
        navigation={navigation}
      />
    </View>
  );
};

export default FloatingButtonsContainer;
