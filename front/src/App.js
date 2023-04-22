import './App.css';
import EnterDetails from './components/EnterDetails.js';
import DisplayTable from './components/DisplayTable.js';

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
              <DisplayTable /> 
          </div> 
      </body> 

    </div>
  );
}

export default App;
