import {React, useState} from "react";

const EnterDetails = () => { 


    const [flightnumber, setFlightNumber] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = () => { 
        // POST REQUEST TO NODE.JS
    } 

    return ( 

        <div> 
            <form onSubmit={handleSubmit}>
                <label>
                    Name:  
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </label>

                <br /> 
                <label>
                    Number:
                    <input type="flightnumber" value={flightnumber} onChange={(event) => setFlightNumber(event.target.value)} />
                </label>

                <br /> 
                <button type="submit" value = "Submit" >Submit</button>
            </form>
        </div> 

    ) 

} 

export default EnterDetails;
