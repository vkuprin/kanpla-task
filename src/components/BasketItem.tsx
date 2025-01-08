import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import type { GetProducts200 } from "@/services/types";

type Props = {
  item: GetProducts200[number];
  total: number;
  onRemove: () => void;
};

export const BasketItem = ({ item, total, onRemove }: Props) => (
  <ThemedView style={styles.container}>
    <ThemedView style={styles.details}>
      <ThemedText style={styles.name}>{item.name}</ThemedText>
      <ThemedText style={styles.price}>${total.toFixed(2)}</ThemedText>
    </ThemedView>
    <TouchableOpacity onPress={onRemove}>
      <ThemedText style={styles.remove}>×</ThemedText>
    </TouchableOpacity>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    marginBottom: 8,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    color: "#fff",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  remove: {
    fontSize: 24,
    color: "#ff4444",
    marginLeft: 8,
  },
});
