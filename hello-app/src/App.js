import './App.css';
import Hello from './Hello.js';
import Passage from './Passage.js';
import Weather from './Weather.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hello/>
        <Passage/>
        <Weather/>
      </header>
    </div>
  );
}

export default App;
