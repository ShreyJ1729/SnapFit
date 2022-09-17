import logo from './logo.svg';
import './App.css';
import {MenuBar} from './components/MenuBar';
import { Camera } from './components/Camera';

function App() {
  return (
    <div className="App">
      <Camera/>
      <MenuBar/>
    </div>
  );
}

export default App;
