import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated'
import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './Components/Start/MenuScreen';
import PlaneSelectScreen from "./Components/PlaneSelect/PlaneSelectScreen";
import Register from "./Components/Register/Register";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import Login from "./Components/Login/Login";
import Shop from "./Components/shop/shop";
import GameHistory from "./Components/GameHistory/GameHistory";
import ProfileEdit from "./Components/profile/ProfileEdit";

const Stack = createNativeStackNavigator();

export default function App() {
  const [selectedPlaneIndex, setSelectedPlaneIndex] = useState(0); // Define selectedPlaneIndex state

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    };

    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Menu">
            <Stack.Screen
                name="Menu"
                component={MenuScreen}
                options={{ headerShown: false }}
                initialParams={{ selectedPlaneIndex }} // Pass selectedPlaneIndex as initial parameter
            />
            <Stack.Screen
                name="PlaneSelect"
                component={PlaneSelectScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Leaderboard"
                component={Leaderboard}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Shop"
                component={Shop}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="History"
                component={GameHistory}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Edit"
                component={ProfileEdit}
                options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
