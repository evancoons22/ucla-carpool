import { Button  } from '@chakra-ui/react'
import moment from 'moment';
import './App.css';
import EnterDetails from './components/EnterDetails.js';
//import DisplayTable from './components/DisplayTable.js';
import MyCalendar from './components/Calendar.js';
import { useState, useEffect }  from 'react';

function App() {
  const [dataindex, setDataIndex] = useState(0);
  const [currentdata, setCurrentData] = useState([]);

  const[farr, setFarr] = useState([]);
  const[dep, setDep] = useState([]);

    
   function handleToggleClick() { 
       console.log(newarrivals2);
       console.log(newdepartures2);

       if (dataindex === 0) { 
           setDataIndex(1); 
           setCurrentData(farr);
       } else { 
           setDataIndex(0);
           setCurrentData(dep);
       }

    } 

    const URL = 'http://localhost:8080/read/events'
    function handleparseObject(deps, arrs) { 
        if (dataindex === 0) { 
            setDataIndex(1);
            setCurrentData(arrs);
        } else { 
            setDataIndex(0);
            setCurrentData(deps);
        }
    }

    let newarrivals2 = []; 
    let newdepartures2 = [];

    const parseObject =(requestdata) => { 
        console.log('running lloop');        
        for (let i = 0; i < requestdata.length; i++) {
            let startdate = moment(requestdata[i].flight_time).toDate();
            let enddate =  moment(requestdata[i].flight_time).toDate(); 
            enddate.setHours(enddate.getHours() + 1);

            let newObj = {
                title: requestdata[i].social_media_handle,
                start: startdate, 
                end: enddate 
            };
            if (requestdata[i].arrival_or_departure === 'arrival') { 
                newarrivals2.push(newObj);
            } else { 
                newdepartures2.push(newObj); 
            } 

        }
        setFarr(newarrivals2);
        setDep(newdepartures2);
        handleparseObject(newdepartures2, newarrivals2);

    } 

    useEffect(() => {
        fetch(URL) 
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log("calling function");
                parseObject(data);
            })
            .catch(error => console.log(error));
    }, []);

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
          { dataindex === 1 ? (
              <Button width = '100%' onClick = {handleToggleClick}> Departures </Button>
          ): (
              <Button width = '100%' onClick = {handleToggleClick}> Arrivals </Button>
          )}
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
