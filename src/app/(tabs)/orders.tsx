import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StyleSheet } from "react-native";
import { format } from "date-fns";
import NetInfo from "@react-native-community/netinfo";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetOrders } from "@/services";

const AUTH_USER_TOKEN = process.env.EXPO_PUBLIC_API_KEY!;

interface Order {
  id: string;
  amount_total: number;
  basket_id: string | null;
  user_id: string;
  created_at: string;
  status: string;
}

export default function OrdersScreen() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useGetOrders(
      { "x-auth-user": AUTH_USER_TOKEN },
      {
        query: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          retry: isOnline ? 3 : 0,
        },
      },
    );

  useEffect(() => {
    if (isError) {
      Alert.alert(
        "Error",
        "Failed to load orders. Please check your connection and try again.",
      );
    }
  }, [isError]);

  const orders = data?.data ?? [];

  const formatDate = (dateString: string): string => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm");
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "completed":
        return "#4CAF50";
      case "pending":
        return "#FFC107";
      case "cancelled":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  const handleRefresh = async () => {
    if (!isOnline) {
      Alert.alert("Offline", "Please check your internet connection");
      return;
    }
    await refetch();
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => {
        Alert.alert(
          `Order #${item.id.slice(0, 6)}`,
          `Status: ${item.status}\nAmount: $${item.amount_total.toFixed(2)}\nCreated: ${formatDate(item.created_at)}`,
        );
      }}
    >
      <ThemedView style={styles.orderHeader}>
        <ThemedView style={styles.orderIdContainer}>
          <ThemedText style={styles.label}>Order ID:</ThemedText>
          <ThemedText style={styles.orderId}>{item.id.slice(0, 6)}</ThemedText>
        </ThemedView>
        <ThemedView
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <ThemedText style={styles.statusText}>{item.status}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.orderDetails}>
        <ThemedView style={styles.detailRow}>
          <ThemedText style={styles.label}>Created:</ThemedText>
          <ThemedText>{formatDate(item.created_at)}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.detailRow}>
          <ThemedText style={styles.label}>Amount:</ThemedText>
          <ThemedText style={styles.amount}>
            ${item.amount_total.toFixed(2)}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#173829" />
        <ThemedText style={styles.loadingText}>Loading orders...</ThemedText>
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

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Orders</ThemedText>
        {isRefetching && <ActivityIndicator style={styles.refreshIndicator} />}
      </ThemedView>

      {isError ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>
            {error instanceof Error ? error.message : "Failed to load orders"}
          </ThemedText>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <ThemedText style={styles.retryText}>Retry</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ) : orders.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText}>No orders found</ThemedText>
        </ThemedView>
      ) : (
        <FlatList<Order>
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContainer}
          refreshing={isRefetching}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  listContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  offlineBanner: {
    backgroundColor: "#ff4444",
    padding: 8,
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 8,
  },
  offlineText: {
    color: "white",
    fontWeight: "bold",
  },
  orderItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 8,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  orderId: {
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  orderDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#666",
    fontWeight: "500",
  },
  amount: {
    fontWeight: "600",
    fontSize: 16,
  },
  errorText: {
    textAlign: "center",
    marginBottom: 16,
    color: "#F44336",
    fontSize: 16,
  },
  retryButton: {
    padding: 12,
    backgroundColor: "#173829",
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  retryText: {
    color: "white",
    fontWeight: "600",
  },
  refreshIndicator: {
    marginLeft: 8,
  },
});
