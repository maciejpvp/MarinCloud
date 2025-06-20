import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

const queryClient = new QueryClient();

const debug = localStorage.getItem("debug") === "true" ? true : false;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <App />
          {debug && <ReactQueryDevtools initialIsOpen={true} />}
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </div>,
);
