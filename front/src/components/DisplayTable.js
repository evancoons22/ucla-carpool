import { useState, useEffect} from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'


const DisplayTable = () => { 

    const [data, setData] = useState(null);
    
    useEffect( () => { 
        // FETCH REQUEST TO GET ALL USER DATA
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);

    const fakedata = [
      { name: 'John Doe', departureTime: '9:00 AM' },
      { name: 'Jane Doe', departureTime: '10:30 AM' },
      { name: 'Bob Smith', departureTime: '11:45 AM' },
      { name: 'Alice Johnson', departureTime: '1:15 PM' },
      { name: 'Mike Davis', departureTime: '2:45 PM' },
      { name: 'Sarah Lee', departureTime: '3:30 PM' },
      { name: 'Tom Brown', departureTime: '4:15 PM' },
      { name: 'Emily Wilson', departureTime: '5:00 PM' },
      { name: 'David Kim', departureTime: '6:30 PM' },
      { name: 'Rachel Lee', departureTime: '7:15 PM' },
      { name: 'Mark Adams', departureTime: '8:00 AM' },
      { name: 'Megan White', departureTime: '9:30 AM' },
      { name: 'Luke Thompson', departureTime: '11:00 AM' },
      { name: 'Samantha Black', departureTime: '12:45 PM' },
      { name: 'Peter Green', departureTime: '2:00 PM' },
      { name: 'Emma Taylor', departureTime: '3:15 PM' },
      { name: 'Jake Brown', departureTime: '4:30 PM' },
      { name: 'Olivia Davis', departureTime: '5:45 PM' },
      { name: 'Max Wilson', departureTime: '7:00 PM' },
      { name: 'Julia Kim', departureTime: '8:30 PM' }
    ];
        return ( 

    <TableContainer>
      <Table variant='simple' size = 'sm'>
        <TableCaption>Carpool Information</TableCaption>
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Time</Th>
            <Th > Contact Button</Th>
          </Tr>
        </Thead>
        <Tbody>
            {
                fakedata.map(item => <Tr> <Td> {item.name} </Td> <Td> {item.departureTime} </Td> <Td> contact </Td>  </Tr> )
            }
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th >multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>

    ) 
}
export default DisplayTable;
