import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/store";
import RootNavigator from "./src/navigation/RootNavigator";
import SessionManager from "./src/components/SessionManager";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SessionManager>
          <RootNavigator />
        </SessionManager>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
