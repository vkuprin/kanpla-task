import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GetProducts200 } from "../services";

type Product = GetProducts200[number];

type ProductItemProps = {
  product: Product;
  onAddToBasket: (product: Product) => void;
};

export const ProductItem = ({ product, onAddToBasket }: ProductItemProps) => (
  <TouchableOpacity
    style={styles.product}
    onPress={() => onAddToBasket(product)}
  >
    <ThemedText style={styles.text}>{product.name}</ThemedText>
    <ThemedText style={styles.text}>
      ${(product.price_unit * (1 + product.vat_rate)).toFixed(2)}
    </ThemedText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  product: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
  },
});
