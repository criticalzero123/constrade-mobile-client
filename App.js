import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./src/screens/onboarding/OnboardingScreen";
import WelcomeUserScreen from "./src/screens/welcome-screen/WelcomeUserScreen";

import MenuStack from "./src/stacks/user/MenuStack";
import SignInStack from "./src/stacks/sign-in/SignInStack";
import SignUpStack from "./src/stacks/sign-up/SignUpStack";
import OtpScreen from "./src/screens/Otp/OtpScreen";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./firebase/firebase-config";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          // initialRouteName="Onboarding"
          // initialRouteName="SignIn"
          initialRouteName="Menu"
        >
          {/* Stacks */}
          <Stack.Screen name="SignIn" component={SignInStack} />
          <Stack.Screen name="SignUp" component={SignUpStack} />

          <Stack.Screen name="Menu" component={MenuStack} />
          {/* Screens */}
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="WelcomeUser" component={WelcomeUserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
