import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "POS",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "basket" : "basket-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "list-circle" : "list-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
