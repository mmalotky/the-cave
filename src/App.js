import { useState, useEffect } from 'react';
import './App.css';
import StartMenu from './components/StartMenu';

function App() {
  const [screen, setScreen] = useState();

  useEffect(() => {
    setScreen(<StartMenu setScreen={setScreen}/>);
  }, []);

  return screen;
}

export default App;
