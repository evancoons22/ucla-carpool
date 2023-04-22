import './App.css';
import EnterDetails from './components/EnterDetails.js';
import Display from './components/Display.js';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
      <h3> UCLA-LAX Carpool</h3>
      </header>

      <body className = 'body'>
            <div className = 'submit'> 
                <EnterDetails />  
            </div> 

            <div className = 'table'> 
                <Display /> 
            </div> 
      </body> 

    </div>
  );
}

export default App;
