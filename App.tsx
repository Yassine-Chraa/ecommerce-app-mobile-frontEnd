import React, {useEffect} from 'react';
import {useColorScheme, LogBox, View, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

/***** React Native Elements *****/
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MyColors from './src/colors';
import SplashScreen from 'react-native-splash-screen';

/***** React Native Navigation *****/
import AppNavigator from './src/navigations/appNavigator';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeWrapper from './src/screens/Home';
import Login from './src/screens/Login';
import Product from './src/screens/Product';
import CartWarraper from './src/screens/Cart';
import SearchResults from './src/screens/SearchResults';
import Categorie from './src/screens/categorie';


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  //"EventEmitter.removeListener"
]);

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#fff',
  };

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: backgroundStyle.backgroundColor,
      }}>
      <StatusBar backgroundColor={MyColors.teal} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="App"
          screenOptions={{
            headerTitle: undefined,
            headerTransparent: true,
            headerBackTitleVisible: false,
            headerShown: false,
          }}>
          <Stack.Screen name="App" component={AppNavigator} />
          <Stack.Screen name="Home" component={HomeWrapper} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cart" component={CartWarraper} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Search" component={SearchResults} />
          <Stack.Screen name="Categorie" component={Categorie} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
