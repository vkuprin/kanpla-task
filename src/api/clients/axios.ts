import axios from "axios";

const client = axios.create({
  baseURL: "https://kanpla-code-challenge.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = process.env.EXPO_PUBLIC_API_KEY;
  if (token) {
    config.headers["x-auth-user"] = token;
  }
  return config;
});

export default client;
