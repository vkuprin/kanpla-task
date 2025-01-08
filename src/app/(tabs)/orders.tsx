import React from "react";
import { FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { format } from "date-fns";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetOrders } from "@/api";

const AUTH_USER_TOKEN = process.env.EXPO_PUBLIC_API_KEY!;

interface Order {
  id: string;
  amount_total: number;
  basket_id: string | null;
  user_id: string;
  created_at: string;
  status: string;
}

export default function TabTwoScreen() {
  const {
    data: orders,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useGetOrders(
    { "x-auth-user": AUTH_USER_TOKEN },
    {
      query: {
        select: (response) => response.data,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  );

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

  const renderOrderItem = ({ item }: { item: Order }) => (
    <ThemedView style={styles.orderItem}>
      <ThemedView style={styles.orderHeader}>
        <ThemedView style={styles.orderIdContainer}>
          <ThemedText style={styles.label}>Order ID:</ThemedText>
          <ThemedText style={styles.orderId}>{item.id}</ThemedText>
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

        <ThemedView style={styles.detailRow}>
          <ThemedText style={styles.label}>User ID:</ThemedText>
          <ThemedText>{item.user_id}</ThemedText>
        </ThemedView>

        {item.basket_id && (
          <ThemedView style={styles.detailRow}>
            <ThemedText style={styles.label}>Basket ID:</ThemedText>
            <ThemedText>{item.basket_id}</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );

  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.errorText}>
          Error loading orders:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </ThemedText>
        <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
          <ThemedText>Retry</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Orders</ThemedText>
        {isRefetching && <ActivityIndicator style={styles.refreshIndicator} />}
      </ThemedView>

      <FlatList<Order>
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContainer}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
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
  listContainer: {
    gap: 12,
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
  },
  retryButton: {
    padding: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    alignItems: "center",
  },
  refreshIndicator: {
    marginLeft: 8,
  },
});
