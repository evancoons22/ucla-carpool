import './App.css';
import EnterDetails from './components/EnterDetails.js';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
      <h3> Submit Name and Flight Number </h3>
      </header>

      <body className = 'body'>
          <EnterDetails className = 'submit' /> 
      </body> 

    </div>
  );
}

export default App;
