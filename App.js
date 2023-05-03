import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import store from "./redux/store";

import "./firebase/firebase-config";
import useUserAuthenticated from "./src/hooks/useUserAuthenticated";
import AppStack from "./src/stacks/auth/AppStack";
import AuthStack from "./src/stacks/auth/AuthStack";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createNativeStackNavigator();

export default function App() {
  const AppNavigator = () => {
    const [isAuthenticated] = useUserAuthenticated();

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {isAuthenticated ? (
            <Stack.Screen component={AppStack} name="AppStack" />
          ) : (
            <Stack.Screen component={AuthStack} name="AuthStack" />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
