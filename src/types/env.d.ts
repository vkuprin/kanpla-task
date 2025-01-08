declare module "@env" {
  export const EXPO_PUBLIC_API_KEY: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_KEY: string;
    }
  }
}
