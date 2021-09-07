import React from "react";
import "./App.css";
import Api from "./components/utils/api";

function App() {
  return (
    <div className="App">
      <h1>Hacker News Posts</h1>
      <Api></Api>
    </div>
  );
}

export default App;
