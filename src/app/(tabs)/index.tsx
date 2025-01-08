import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  useGetProducts,
  usePostOrders,
  usePostPayments,
} from "@/services/hooks";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBasket } from "@/hooks/useBasket";
import { BasketItem } from "@/components/BasketItem";
import { ProductItem } from "@/components/ProductItem";
import { GetProducts200 } from "@/services";

const AUTH_USER_TOKEN = process.env.EXPO_PUBLIC_API_KEY!;
const OFFLINE_QUEUE_KEY = "@offline_queue";

type Product = GetProducts200[number];

export default function PosScreen() {
  const {
    items: basket,
    addItem,
    removeItem,
    calculateTotal,
    clearBasket,
  } = useBasket();
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
            total: calculateTotal(),
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
        clearBasket();
        setOrderId(null);
        Alert.alert("Success", "Payment completed successfully!");
      },
      onError: () => {
        Alert.alert("Error", "Payment failed. Please try again.");
      },
    },
  });

  const getOfflineQueue = async () => {
    try {
      const queue = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch {
      return [];
    }
  };

  const handleCreateOrder = () => {
    createOrder({
      data: { total: calculateTotal() },
      headers: { "x-auth-user": AUTH_USER_TOKEN },
    });
  };

  const handlePayOrder = () => {
    if (!orderId) return;
    payOrder({
      data: {
        order_id: orderId,
        amount: calculateTotal(),
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

  return (
    <ThemedView style={styles.container}>
      {!isOnline && (
        <ThemedView style={styles.offlineBanner}>
          <ThemedText style={styles.offlineText}>You are offline</ThemedText>
        </ThemedView>
      )}

      <ThemedView style={styles.leftColumn}>
        <FlatList<Product>
          data={products}
          renderItem={({ item }) => (
            <ProductItem product={item} onAddToBasket={addItem} />
          )}
          keyExtractor={(item) => item.id}
        />
      </ThemedView>

      <ThemedView style={styles.rightColumn}>
        <FlatList<Product>
          data={basket}
          renderItem={({ item, index }) => (
            <BasketItem
              item={item}
              total={item.price_unit * (1 + item.vat_rate)}
              onRemove={() => removeItem(index)}
            />
          )}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          ListFooterComponent={() => (
            <>
              <ThemedText style={[styles.text, styles.totalText]}>
                Total: ${calculateTotal().toFixed(2)}
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
  leftColumn: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f4f4f4",
  },
  rightColumn: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
    borderLeftWidth: 1,
    borderLeftColor: "#ddd",
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
  text: {
    color: "#333",
  },
  totalText: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
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
  errorText: {
    color: "#ff4444",
    marginBottom: 10,
  },
});
