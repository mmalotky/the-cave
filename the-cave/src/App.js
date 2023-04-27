import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GamePage from "./components/GameScreen/GamePage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route index element={<div>Hello</div>}/>
        <Route path="game" element={<GamePage/>}/>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
