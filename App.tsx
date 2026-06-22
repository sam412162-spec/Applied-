import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SavedProvider } from './context/SavedContext';
import TabNavigator from './navigation/TabNavigator';

export default function App() {
  return (
    <SavedProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <TabNavigator />
      </NavigationContainer>
    </SavedProvider>
  );
}
