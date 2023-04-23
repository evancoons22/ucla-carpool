import { Button  } from '@chakra-ui/react'
import './App.css';
import EnterDetails from './components/EnterDetails.js';
//import DisplayTable from './components/DisplayTable.js';
import MyCalendar from './components/Calendar.js';
import { useState }  from 'react';
import arrivals from './testdata/arrivals.js';
import departures from './testdata/departures.js';

function App() {
  const [dataindex, setDataIndex] = useState(0);
  const [currentdata, setCurrentData] = useState(arrivals);
    
   function handleToggleClick() { 

       if (dataindex === 0) { 
           setDataIndex(1);
           setCurrentData(departures);
       } else { 
           setDataIndex(0);
           setCurrentData(arrivals);
       }

    } 

  return (
    <div className="App">
      
      <header className="App-header">
      <div>
          <h2> UCLA-LAX Carpool</h2>
      </div>
      </header>

      <body className = 'body'>
          <div className = 'toggle'> 
          </div>
          <div className = 'submit'> 
              <EnterDetails />  
              <Button onClick = {handleToggleClick}> Toggle </Button>
          </div> 
          <div className = 'calendar'> 
              <MyCalendar currentdata = {currentdata} />
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
