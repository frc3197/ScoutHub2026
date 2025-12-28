import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { FormProvider } from '../util/match-form';

const MatchLayout = () => {
  return (
    <FormProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'orange' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'General',
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="auto"
          options={{
            title: 'Auto',
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'car' : 'car-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tele"
          options={{
            title: 'Tele',
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'game-controller' : 'game-controller-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="conclude"
          options={{
            title: 'Conclude',
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'cloud-upload' : 'cloud-upload-outline'} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="match-form"
          options={{
            title: 'DONT CLICK',
            headerShown: false,
            tabBarButton: () => null,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? 'cloud-upload' : 'cloud-upload-outline'} size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </FormProvider>
  );
}

export default MatchLayout;