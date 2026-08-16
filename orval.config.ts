import { defineConfig } from "orval";

export default defineConfig({
  note: {
    input: {
      target: "http://localhost:3000/api-json",
    },
    output: {
      target: "./src/api/notes",
      client: "react-query",
      httpClient: "fetch",
      baseUrl: "http://localhost:3000",
    },
  },
});
