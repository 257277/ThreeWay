import React,{useState} from "react";
import style from "../pages/style/data.module.css"
import {FormControl,FormLabel,Input,FormHelperText,FormErrorMessage,Button,Center,Heading,Divider} from '@chakra-ui/react'
import Navbar from "./navbar";


export default function Data()
{
    const [input, setInput] = useState('')

    const handleInputChange = (e) => setInput(e.target.value)
    
    const isError = input === ''

   async function recData()
    {
        console.log(input)
        let url=""
    }


    return (
        <div>
              <Navbar></Navbar>
            <Center height='50px'>
        </Center>
            <Heading size='lg' fontSize='50px' color={"blue.600"}>Uploaded data</Heading>
            <Center height='100px'>
          <Divider />
        </Center>
            <FormControl isInvalid={isError} w={"60%"} margin={"auto"}>
      <FormLabel>Email</FormLabel>
      <Input type='email' value={input} onChange={handleInputChange} />
      {!isError ? (
        <FormHelperText>
          Enter the email to get your uploaded data
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
      <Button marginTop={"50px"} bg={"blue.400"} color={"white"} fontSize={"20px"} onClick={recData}>Send</Button>
    </FormControl>
    <Center height='30px'>
          <Divider />
        </Center>
        </div>
    )
}