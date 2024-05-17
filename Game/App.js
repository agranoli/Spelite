import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-reanimated'
import MenuScreen from './Components/Start/MenuScreen';
import Shop from "./Components/shop/shop";
import Payment from "./Components/payment";
import Game from "./Components/game/game";

const Stack = createNativeStackNavigator();

export default function App() {

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
          <Stack.Navigator initialRouteName="Game">
            <Stack.Screen
                name="Shop"
                component={Shop}
                options={{ headerShown: false }} // Remove header for Shop
            />
            <Stack.Screen
                name="Payment"
                component={Payment}
                options={{ headerShown: false }} // Remove header for Payment
            />
            <Stack.Screen
                name="Game"
                component={Game}
                options={{ headerShown: false }} // Remove header for Payment
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
