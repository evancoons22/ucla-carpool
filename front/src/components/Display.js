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


const Display = () => { 

    const [data, setData] = useState(null);
    
    useEffect( () => { 
        // get Data on load
        // let response = fetch(URL, body = {}) 
    })

    return ( 

    <TableContainer>
      <Table variant='simple' size = 'sm'>
        <TableCaption>Carpool Information</TableCaption>
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Time</Th>
            <Th isNumeric> Contact Button</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Name 1</Td>
            <Td> 2:37 </Td>
            <Td > contactj</Td>
          </Tr>
          <Tr>
            <Td>Name 2</Td>
            <Td>5:00</Td>
            <Td isNumeric> contact</Td>
          </Tr>
          <Tr>
            <Td>Name 3</Td>
            <Td> 12:30 </Td>
            <Td isNumeric> contact</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>

    ) 
}
export default Display;
