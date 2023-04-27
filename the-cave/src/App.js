import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GamePage from "./components/GameScreen/GamePage";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Home from "./components/Home"
import Login from "./components/Login";
import { useState } from "react";
import AuthContext from "./context/AuthContext"
import CreateAccount from "./components/CreateAccount";

function App() {
  let currentUserData = localStorage.getItem("userData");

  if (currentUserData) {
    currentUserData = JSON.parse(currentUserData);
  }

  const [user, setUser] = useState(currentUserData);
  const SERVER_URL = "http://localhost:8080/api"

  return (
    <AuthContext.Provider value={user}>
      <Router>
        <NavBar setUser={setUser}/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="game" element={
            user ?
            <GamePage/> :
            <Navigate to="/login"/>
          }/>
          <Route path="login" element={<Login SERVER_URL={SERVER_URL} setUser={setUser}/>}/>
          <Route path="create-account" element={<CreateAccount/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </AuthContext.Provider> 
  );
}

export default App;
