import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import MainPage from "./components/MainPage/MainPage";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainPage></MainPage>
      </div>
    </Provider>
  );
}

export default App;
