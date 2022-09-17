import logo from './logo.svg';
import './App.css';
import { Wardrobe } from './components/Wardrobe'
import { MenuBar } from './components/MenuBar';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Outlet/>
      <MenuBar/>
    </div>
  );
}

export default App;
