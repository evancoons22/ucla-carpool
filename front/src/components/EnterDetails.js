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
    const [phonenumber, setPhoneNumber] = useState('');
    const [arriving, setArriving] = useState('');

    const URL = 'http://localhost:8080/create/event/timed';


    const handleSubmit = (event) => { 
        // fetch post request to node backend
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: name, social_media_handle: phonenumber, flight_time: usertime.toString(), arrival_or_departure: arriving})
        })
            .then(response => response.json())
            .then(data => { 
                console.log(data);
            })
            .catch(error => console.error(error));
        console.log(arriving);

        console.log("submithandled");
        setName('');
        setUsertime('');
        setPhoneNumber('');
        setArriving('');

    } 

    return ( 

        <div>
          <Button width = '100%' onClick={onOpen}>Create Time</Button>
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
                        <Input variant='filled' placeholder="Social Media Handle" size="md" type="text" value={phonenumber} onChange={(event) => setPhoneNumber(event.target.value)}  />


                    <br />
                    <br />
                    <RadioGroup onChange={setArriving} value={arriving}>
                      <Stack direction='row'>
                        <Radio value='arrival'>Arriving</Radio>
                        <Radio value='departure'>Departing</Radio>
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
