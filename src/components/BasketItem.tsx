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
      <ThemedText style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </ThemedText>
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
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    flexShrink: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#286429",
    marginLeft: 8,
  },
  remove: {
    fontSize: 24,
    color: "#E53935",
    marginLeft: 8,
    fontWeight: "bold",
  },
});
