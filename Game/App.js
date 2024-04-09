import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MenuScreen from './Components/Start/MenuScreen';
import PlaneSelectScreen from "./Components/PlaneSelect/PlaneSelectScreen";
import Register from "./Components/Register/Register";
import Shop from "./Components/shop/shop";
import Payment from "./Components/payment";

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
          <Stack.Navigator initialRouteName="Menu">
            <Stack.Screen
                name="Menu"
                component={MenuScreen}
                options={{ headerShown: false }} // Remove header for MenuScreen
            />
            <Stack.Screen
                name="Shop"
                component={Shop}
                options={{ headerShown: false }} // Remove header for MenuScreen
            />
            <Stack.Screen
                name="PlaneSelect"
                component={PlaneSelectScreen}
                options={{ headerShown: false }} // Remove header for PlaneSelectScreen
            />
            <Stack.Screen
                name="Payment"
                component={Payment}
                options={{ headerShown: false }} // Remove header for PlaneSelectScreen
            />
            {/*<Stack.Screen*/}
            {/*    name="Register"*/}
            {/*    component={Register}*/}
            {/*    options={{ headerShown: false }} // Remove header for PlaneSelectScreen*/}
            {/*/>*/}
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