import './App.css';
import Greet from './Components/greet';

function App() {
  const name = 'SID';
  return (
    <div className="App">
      {/* Props ie passing values from parent to children component */}
      {/* Basically components are js functions that takes props as arg and outputs markup */}
      <Greet name={name} /> 
    </div>
  );
}

export default App;
