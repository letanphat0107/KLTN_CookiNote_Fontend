// src/components/FloatingButtons/FloatingButtonsContainer.tsx
import React, { useState } from "react";
import { View } from "react-native";
import ShoppingListButton from "./ShoppingListButton";
import AIChatButton from "./AIChatButton";
import { floatingStyles } from "./styles";

interface FloatingButtonsContainerProps {
  navigation?: any;
  showShoppingList?: boolean;
  isAdminMode?: boolean;
}

const FloatingButtonsContainer: React.FC<FloatingButtonsContainerProps> = ({
  navigation,
  showShoppingList = true,
  isAdminMode = false,
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
    if (isShoppingListOpen && showShoppingList) {
      setIsShoppingListOpen(false);
    }
    setIsAIChatOpen(!isAIChatOpen);
  };

  return (
    <View style={floatingStyles.container}>
      <AIChatButton
        isOpen={isAIChatOpen}
        onToggle={handleAIChatToggle}
        navigation={navigation}
        isAdminMode={isAdminMode}
      />
      {showShoppingList && (
        <ShoppingListButton
          isOpen={isShoppingListOpen}
          onToggle={handleShoppingListToggle}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default FloatingButtonsContainer;
