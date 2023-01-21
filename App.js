import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./src/screens/onboarding/OnboardingScreen";
import WelcomeUserScreen from "./src/screens/welcome-screen/WelcomeUserScreen";

import UserStack from "./src/stacks/user/UserStack";
import SignInStack from "./src/stacks/sign-in/SignInStack";
import { KeyboardAvoidingView } from "react-native";
import SignUpStack from "./src/stacks/sign-up/SignUpStack";
import OtpScreen from "./src/screens/Otp/OtpScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Onboarding"
      >
        {/* Stacks */}
        <Stack.Screen name="SignIn" component={SignInStack} />
        <Stack.Screen name="SignUp" component={SignUpStack} />

        <Stack.Screen name="User" component={UserStack} />
        {/* Screens */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="WelcomeUser" component={WelcomeUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
