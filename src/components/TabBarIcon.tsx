import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import type { ComponentProps } from "react";

type TabBarIconProps = ComponentProps<typeof Ionicons> & {
  name: ComponentProps<typeof Ionicons>["name"];
  size?: number;
  color?: string;
};

export const TabBarIcon = ({
  name,
  size = 28,
  color = "black",
  style,
  ...rest
}: TabBarIconProps) => {
  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
      style={[styles.icon, style]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});
