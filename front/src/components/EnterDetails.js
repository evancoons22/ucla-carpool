import {React, useState} from "react";
import { Button, Input } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import { Radio, RadioGroup, Stack, FormControl} from '@chakra-ui/react';


const EnterDetails = () => { 

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [name, setName] = useState('');
    const [usertime, setUsertime] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [arriving, setArriving] = useState('');

    // const URL = '';

    /* const codeforlater =  { 

        console.log('submithandled');
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, usertime })
        })
            .then(response => response.json())
            .then(data => { 
                console.log(data);
                event.target.reset();
            })
            .catch(error => console.error(error));       // POST REQUEST TO NODE.JS

    } */

    const handleSubmit = (event) => { 
        // fetch post request to node backend
        console.log("submithandled");
        setName('');
        setUsertime('');
        setEmail('');
        setPhoneNumber('');
        setArriving('');

        setTimeout(() => {
          alert(JSON.stringify("submission processed"))
        }, 1000)
    } 

    return ( 

        <div>
          <Button onClick={onOpen}>Create Time</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Enter Details</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <form onSubmit={handleSubmit}>
                {/* try to figure out form control later */}
                <FormControl isRequired> 
                        <Input  variant='filled' placeholder = 'Name' type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </FormControl>

                    <br />
                        <Input variant='filled' placeholder="Select Date and Time" size="md" type="datetime-local" value={usertime} onChange={(event) => setUsertime(event.target.value)}  />

                    <br />
                    <br />
                        <Input variant='filled' placeholder="Phone Number" size="md" type="tel" value={phonenumber} onChange={(event) => setPhoneNumber(event.target.value)}  />

                    <br />
                    <br />
                        <Input variant='filled' placeholder="Email" size="md" type="email" value={email} onChange={(event) => setEmail(event.target.value)}  />

                    <br />
                    <br />
                    <RadioGroup onChange={setArriving} value={arriving}>
                      <Stack direction='row'>
                        <Radio value='Arrival'>Arriving</Radio>
                        <Radio value='Departure'>Departing</Radio>
                      </Stack>
                    </RadioGroup>

                    <br /> 
                </form>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme = 'blue' type = 'submit' onClick = {handleSubmit} >Submit</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>


    ) 

} 

export default EnterDetails;
