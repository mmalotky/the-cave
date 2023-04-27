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

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="game" element={<GamePage/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
