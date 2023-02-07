import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../Pages/Welcome";
import Signin from "../Pages/Signin";
import Room from "../Pages/rooms";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Signin"
                component={Signin}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Room"
                component={Room}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}