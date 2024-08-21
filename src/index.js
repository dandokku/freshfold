import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import store from "./Pages/App/store"
import { ReactQueryDevtools } from "react-query/devtools"
import ScrollToTopButton from './Components/ScrollToTopButton';


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} className="relative">
      <Provider store={store}>
        <App />
      </Provider>
      {/* <ScrollToTopButton className="" /> */}
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>
);

