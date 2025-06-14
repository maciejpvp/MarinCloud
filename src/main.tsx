import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

const queryClient = new QueryClient();

const debug = localStorage.getItem("debug") === "true" ? true : false;

const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

console.log(redirectUrl);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <App />
          {debug && <ReactQueryDevtools />}
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </div>,
);
