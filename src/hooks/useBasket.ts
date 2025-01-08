import { useState } from "react";
import type { GetProducts200 } from "@/services/types";

type Product = GetProducts200[number];

export const useBasket = () => {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = (product: Product) => {
    setItems((prev) => [...prev, product]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateItemTotal = (item: Product) => {
    return item.price_unit * (1 + item.vat_rate);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const clearBasket = () => {
    setItems([]);
  };

  return {
    items,
    addItem,
    removeItem,
    calculateItemTotal,
    calculateTotal,
    clearBasket,
    isEmpty: items.length === 0,
  };
};
