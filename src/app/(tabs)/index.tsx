import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Text } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type Product = {
  id: string;
  name: string;
  price_unit: number;
  vat_rate: number;
};

const AUTH_USER_TOKEN = process.env.EXPO_PUBLIC_API_KEY!;

export default function PosScreen() {
  const [basket, setBasket] = useState([]);
  const [products, setProducts] = useState([] as Product[]);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://kanpla-code-challenge.up.railway.app/products", {
      headers: {
        "x-auth-user": AUTH_USER_TOKEN,
      },
    })
      .then((response) => response.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error(error));
  }, []);

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.product}
      onPress={() => setBasket((prev) => [...prev, item])}
    >
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>${item.price_unit * (item.vat_rate + 1)}</Text>
    </TouchableOpacity>
  );

  const createOrder = () => {
    fetch("https://kanpla-code-challenge.up.railway.app/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-user": AUTH_USER_TOKEN,
      },
      body: JSON.stringify({
        total: basket.reduce((acc, item) => acc + item.price_unit, 0),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setOrderId(json.id);
      })
      .catch((error) => console.error(error));
  };

  const payOrder = useCallback(() => {
    fetch(`https://kanpla-code-challenge.up.railway.app/payments`, {
      method: "POST",
      headers: {
        "x-auth-user": AUTH_USER_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId,
        amount: basket.reduce((acc, item) => acc + item.price_unit, 0),
      }),
    })
      .then((response) =>
        response.status === 201 ? response.json() : Promise.reject(response),
      )
      .then((json) => {
        fetch(
          `https://kanpla-code-challenge.up.railway.app/orders/${json.order_id}`,
          {
            method: "PATCH",
            headers: {
              "x-auth-user": AUTH_USER_TOKEN,
            },
            body: JSON.stringify({
              status: "completed",
            }),
          },
        )
          .then((response) =>
            response.status === 201
              ? response.json()
              : Promise.reject(response),
          )
          .then((json) => {
            setBasket([]);
            setOrderId(null);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, [orderId, basket]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.productGrid}>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </ThemedView>

      <ThemedView style={styles.basket}>
        <ThemedText type="title" style={styles.text}>
          Basket
        </ThemedText>

        {basket.map((item, index) => (
          <ThemedView key={index} style={styles.basketItem}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>${item.price}</Text>
          </ThemedView>
        ))}

        <ThemedText style={styles.text}>
          Total: ${basket.reduce((acc, item) => acc + item.price_unit, 0)}
        </ThemedText>

        <TouchableOpacity style={styles.button} onPress={createOrder}>
          <ThemedText style={styles.buttonText}>Create Order</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !orderId && { backgroundColor: "#555" }]}
          onPress={payOrder}
          disabled={!orderId}
        >
          <ThemedText style={styles.buttonText}>Pay</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  productGrid: {
    flex: 2,
    padding: 10,
  },
  product: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
  },
  basket: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1e1e1e",
  },
  basketItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    padding: 5,
  },
  text: {
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#173829",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
