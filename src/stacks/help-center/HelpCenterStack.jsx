import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HelpCenter from "../../screens/help-center/HelpCenter";
import SubmitFeedback from "../../screens/help-center/SubmitFeedback";

const Stack = createNativeStackNavigator();

export default function HelpCenterStack() {
  return (
    <Stack.Navigator
      initialRouteName="HelpCenterScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={HelpCenter} name="HelpCenterScreen" />
      <Stack.Screen component={SubmitFeedback} name="SubmitFeedback" />
    </Stack.Navigator>
  );
}
