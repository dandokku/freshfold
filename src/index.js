import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import store from "./Pages/App/store"
import { ReactQueryDevtools} from "react-query/devtools"



const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
        <ReactQueryDevtools/>
      </QueryClientProvider>
  </React.StrictMode>
);

