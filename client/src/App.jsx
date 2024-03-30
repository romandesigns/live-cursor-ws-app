import "./App.css";
import { useState } from "react";
import { Login } from "./components/Login";
import HomePage from "./pages/HomePage";

function App() {
  const [userName, setUserName] = useState("");

  return userName ? (
    <HomePage userName={userName} />
  ) : (
    <Login onSubmit={setUserName} />
  );
}

export default App;
