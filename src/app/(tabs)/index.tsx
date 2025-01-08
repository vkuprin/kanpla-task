import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetProducts, usePostOrders, usePostPayments } from "@/api/hooks";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { GetProducts200 } from "@/api/types";

export type Product = GetProducts200[number];

const AUTH_USER_TOKEN = process.env.EXPO_PUBLIC_API_KEY!;
const OFFLINE_QUEUE_KEY = "@offline_queue";

export default function PosScreen() {
  const [basket, setBasket] = useState<Product[]>([]);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);

  const {
    data,
    isLoading: isLoadingProducts,
    error: productsError,
    refetch: refetchProducts,
  } = useGetProducts(
    { "x-auth-user": AUTH_USER_TOKEN },
    {
      query: {
        retry: 3,
        staleTime: 5 * 60 * 1000,
      },
    },
  );

  const products = data?.data ?? [];

  const { mutate: createOrder, isPending: isCreatingOrder } = usePostOrders({
    mutation: {
      onMutate: async () => {
        if (!isOnline) {
          const order = {
            basket,
            total: calculateBasketTotal(),
            timestamp: Date.now(),
          };
          const queue = await getOfflineQueue();
          await AsyncStorage.setItem(
            OFFLINE_QUEUE_KEY,
            JSON.stringify([...queue, order]),
          );
          Alert.alert(
            "Offline Mode",
            "Order saved and will be processed when online",
          );
        }
      },
      onSuccess: (response) => {
        setOrderId(response.data.id);
      },
      onError: () => {
        Alert.alert("Error", "Failed to create order. Please try again.");
      },
    },
  });

  const { mutate: payOrder, isPending: isPaying } = usePostPayments({
    mutation: {
      onSuccess: () => {
        setBasket([]);
        setOrderId(null);
        Alert.alert("Success", "Payment completed successfully!");
      },
      onError: () => {
        Alert.alert("Error", "Payment failed. Please try again.");
      },
    },
  });

  const calculateItemTotal = (item: Product) => {
    return item.price_unit * (1 + item.vat_rate);
  };

  const calculateBasketTotal = () => {
    return basket.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const getOfflineQueue = async () => {
    try {
      const queue = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch {
      return [];
    }
  };

  const handleAddToBasket = (product: Product) => {
    setBasket((prev) => [...prev, product]);
  };

  const handleRemoveFromBasket = (index: number) => {
    setBasket((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateOrder = () => {
    createOrder({
      data: { total: calculateBasketTotal() },
      headers: { "x-auth-user": AUTH_USER_TOKEN },
    });
  };

  const handlePayOrder = () => {
    if (!orderId) return;
    payOrder({
      data: {
        order_id: orderId,
        amount: calculateBasketTotal(),
      },
      headers: { "x-auth-user": AUTH_USER_TOKEN },
    });
  };

  if (isLoadingProducts) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#173829" />
        <ThemedText>Loading products...</ThemedText>
      </ThemedView>
    );
  }

  if (productsError) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>
          Failed to load products
        </ThemedText>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => refetchProducts()}
        >
          <ThemedText style={styles.buttonText}>Retry</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.product}
      onPress={() => handleAddToBasket(item)}
    >
      <ThemedText style={styles.text}>{item.name}</ThemedText>
      <ThemedText style={styles.text}>
        ${calculateItemTotal(item).toFixed(2)}
      </ThemedText>
    </TouchableOpacity>
  );

  const renderBasketItem = ({
    item,
    index,
  }: {
    item: Product;
    index: number;
  }) => (
    <ThemedView style={styles.basketItem}>
      <ThemedText style={styles.text}>{item.name}</ThemedText>
      <ThemedText style={styles.text}>
        ${calculateItemTotal(item).toFixed(2)}
      </ThemedText>
      <TouchableOpacity onPress={() => handleRemoveFromBasket(index)}>
        <ThemedText style={styles.removeText}>×</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      {!isOnline && (
        <ThemedView style={styles.offlineBanner}>
          <ThemedText style={styles.offlineText}>You are offline</ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.productGrid}>
        <FlatList<Product>
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

        <FlatList<Product>
          data={basket}
          renderItem={renderBasketItem}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          ListFooterComponent={() => (
            <>
              <ThemedText style={[styles.text, styles.totalText]}>
                Total: ${calculateBasketTotal().toFixed(2)}
              </ThemedText>

              <TouchableOpacity
                style={[
                  styles.button,
                  basket.length === 0 && styles.disabledButton,
                ]}
                onPress={handleCreateOrder}
                disabled={isCreatingOrder || basket.length === 0}
              >
                <ThemedText style={styles.buttonText}>
                  {isCreatingOrder ? "Creating Order..." : "Create Order"}
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  (!orderId || isPaying) && styles.disabledButton,
                ]}
                onPress={handlePayOrder}
                disabled={!orderId || isPaying}
              >
                <ThemedText style={styles.buttonText}>
                  {isPaying ? "Processing Payment..." : "Pay"}
                </ThemedText>
              </TouchableOpacity>
            </>
          )}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  offlineBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ff4444",
    padding: 5,
    zIndex: 1,
  },
  offlineText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  productGrid: {
    flex: 2,
    padding: 10,
  },
  product: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
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
    alignItems: "center",
    marginVertical: 5,
    padding: 8,
    backgroundColor: "#2a2a2a",
    borderRadius: 5,
  },
  text: {
    color: "#ffffff",
  },
  errorText: {
    color: "#ff4444",
    marginBottom: 10,
  },
  totalText: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  removeText: {
    color: "#ff4444",
    fontSize: 20,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#173829",
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#555",
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  retryButton: {
    backgroundColor: "#173829",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
