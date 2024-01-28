import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store.jsx"; // store dosyanızın yoluna göre düzenleyin
import "./App.css";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@emotion/react";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
