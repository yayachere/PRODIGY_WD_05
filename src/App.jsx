import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Weather from './Components/Weather';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div>
      <Navbar isDarkMode= {isDarkMode} setIsDarkMode={setIsDarkMode}/>
      <Weather isDarkMode={isDarkMode}/>
    </div>
  );
}

export default App;
