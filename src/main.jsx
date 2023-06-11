import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/GRoutes.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./Providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />

          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
