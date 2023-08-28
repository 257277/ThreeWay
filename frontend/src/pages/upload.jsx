import React,{useState} from "react";
import style from "../pages/style/upload.module.css";
import Navbar from "./navbar";
import {UnorderedList,ListItem,Divider,Center,Heading,Text,Button,FormControl,FormLabel,Input,FormHelperText,FormErrorMessage} from '@chakra-ui/react';


export default function Upload()
{

        const [audioFiles, setAudioFiles] = useState([]);
        const [input, setInput] = useState('')
        const handleFileChange = (event) => {
          const updatedFiles = [...audioFiles, ...event.target.files];
          setAudioFiles(updatedFiles);
        };

      const handleInputChange = (e) => setInput(e.target.value)
    
      const isError = input === ''

      async function sendData()
      {
        const formData = new FormData();
        for (const file of audioFiles) {
          formData.append('file', file);
        }
        formData.append('email', input);
      
        let url = "http://127.0.0.1:5002/uploadfile";
        try{
        let res = await fetch(url, {
          method: "POST",
          body: formData,
        });
        if(res.ok)
        {
            let r=await res.json();
            alert(r.msg);
        }
        else{
           alert("Something went wrong");
        }
    }
    catch(err)
    {
        alert("Something went wrong");
        console.log(err);
    }
      }
    
    return (
        <div>
            <Navbar></Navbar>
            <Center height='50px'>
        </Center>
            <Heading size='lg' fontSize='50px' color={"blue.600"}>Welcome to audio ocean</Heading>
            <Center height='100px'>
          <Divider />
        </Center>
        <input type="file" accept="audio/*" multiple onChange={handleFileChange}/>
        <Text fontSize='xl' color={"grey"} marginTop={"20px"}>Choose single or mutiple audio files</Text>
        <Center height='30px'>
          <Divider />
        </Center>
        <Text fontSize='3xl'  marginTop={"20px"}>Selected Files</Text>
        <Center height='50px'>
        </Center>
        <UnorderedList>
          {audioFiles.map((file, index) => (
            <ListItem key={index}>{file.name}</ListItem>
          ))}
      </UnorderedList>
      <Center height='50px'>
          <Divider />
        </Center>
        <FormControl isInvalid={isError} w={"60%"} margin={"auto"}>
      <FormLabel>Email</FormLabel>
      <Input type='email' value={input} onChange={handleInputChange} />
      {!isError ? (
        <FormHelperText>
          Enter the email
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
      <Button marginTop={"50px"} bg={"blue.400"} color={"white"} fontSize={"20px"} onClick={sendData}>Upload selected audio files</Button>
     

    </FormControl>
      </div>
  
    )
}