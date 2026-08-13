import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import About from "./About.tsx";
import NotFound from "./NotFound.tsx";
import Dashboard from "./Dashboard.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardItems from "./DashboardItems.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddPostComponent from "./AddPost.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/post", element: <AddPostComponent /> },

  { path: "/about", element: <About /> },
  { path: "/dashboard/", element: <Dashboard /> },
  { path: "/dashboard/:id", element: <DashboardItems /> },

  { path: "*", element: <NotFound /> },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
