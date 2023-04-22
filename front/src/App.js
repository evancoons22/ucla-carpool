import './App.css';
import EnterDetails from './components/EnterDetails.js';
//import DisplayTable from './components/DisplayTable.js';
import MyCalendar from './components/Calendar.js';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
      <div>
          <h2> UCLA-LAX Carpool</h2>
      </div>
      </header>

      <body className = 'body'>
          <div className = 'submit'> 
              <EnterDetails />  
          </div> 
      <div className = 'calendar'> 
      <MyCalendar />
      </div>
      {/* <div className = 'table'> 
              <DisplayTable /> 
          </div> 
          */}
      </body> 

    </div>
  );
}

export default App;
