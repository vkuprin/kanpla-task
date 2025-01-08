import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginClient } from "@kubb/plugin-client";

export default defineConfig({
  input: {
    path: "./schema.json",
  },
  output: {
    path: "./src/services",
    clean: true,
  },
  plugins: [
    pluginOas(),
    pluginTs(),
    pluginClient({
      output: {
        path: "./clients",
      },
      client: "axios",
      importPath: "../clients/axios",
    }),
    pluginReactQuery({
      output: {
        path: "./hooks",
      },
      group: {
        type: "tag",
        name: ({ group }) => `${group}Hooks`,
      },
      client: {
        importPath: "../clients/axios",
        dataReturnType: "full",
      },
      mutation: {
        methods: ["post", "put", "delete"],
      },
      infinite: {
        queryParam: "next_page",
        initialPageParam: 0,
        cursorParam: "nextCursor",
      },
      query: {
        methods: ["get"],
      },
      suspense: {},
    }),
  ],
});
