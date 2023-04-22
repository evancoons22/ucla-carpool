import {React, useState} from "react";
import { Button, Input } from '@chakra-ui/react'

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
                    <Input  placeholder = 'Enter Name' type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </label>

                <br /> 
                <label>
                    <Input placeholder="Select Date and Time" size="md" type="datetime-local" value={flightnumber} onChange={(event) => setFlightNumber(event.target.value)}  />
                </label>

                <br /> 
                <Button colorScheme = 'blue' >Submit</Button>
            </form>
        </div> 

    ) 

} 

export default EnterDetails;
