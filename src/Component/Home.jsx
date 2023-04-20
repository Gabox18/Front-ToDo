import { Box, Button, Divider, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncPostTask, asyncGetTask, asyncDeleteTask, asyncDone } from "../redux/slice.js"
import { Link } from "react-router-dom"
function Home() {
    let dispatch = useDispatch()
    let { AllTask } = useSelector(state => state.TodoReducer)

    const [input, setInput] = useState({
        title: "",
        description: ""
    })

    const validate = (field, maxCharacter) => {
        let message = {}
        if (input[field] === '') message[field] = `${field} is required.`
        if (input[field]?.length > maxCharacter) message[field] = `${field} Max ${maxCharacter} character`
        return message
    }

    const isError = Object.keys(validate('title', 30)).length !== 0
    const isError2 = Object.keys(validate('description', 80)).length !== 0

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        console.log(isError)
    }

    useEffect(() => {
        dispatch(asyncGetTask())
    }, [dispatch])

    //-------------------------------------HANDLES-------------------------------------------------

    function handleTaskSubmit() {
        dispatch(asyncPostTask(input))
        setTimeout(() => {
            dispatch(asyncGetTask())
        }, 100);
        setInput({
            title: "",
            description: ""
        })
    }

    function handleDeleteTask(id) {
        dispatch(asyncDeleteTask(id))
        setTimeout(() => {
            dispatch(asyncGetTask())
        }, 100);
    }

    function handleDone(id) {
        dispatch(asyncDone(id))
        setTimeout(() => {
            dispatch(asyncGetTask())
        }, 100);
    }
    //-----------------------------------------------------------------------------------------------

    return (
        <Box display={"flex"}>
            <Stack bg={'teal'} w='30%' p={'2rem'} borderRadius='1rem' m={'2rem'}>
                <Heading>Add Task</Heading>
                <FormControl isInvalid={isError}>
                    <FormLabel>Write a Title</FormLabel>
                    <Input type='text' name="title" value={input.title} onChange={handleInputChange} />
                    {!isError ? (
                        <FormHelperText color={'white'}>
                            The title is valid.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>{validate('title', 30).title}</FormErrorMessage>
                    )}
                </FormControl>
                <FormControl isInvalid={isError2}>
                    <FormLabel>Description</FormLabel>
                    <Input type='text' name="description" value={input.description} onChange={handleInputChange} />
                    {!isError2 ? (
                        <FormHelperText color={'white'}>
                            The Description is valid.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>{validate('description', 80).description}</FormErrorMessage>
                    )}

                    <Button mt={4} colorScheme='teal' type='submit' onClick={handleTaskSubmit}>
                        Submit
                    </Button>
                </FormControl>
            </Stack>

            <TableContainer w={'70%'} p='2rem'>
                <Table variant='striped' colorScheme='teal' size={'sm'}>
                    <TableCaption>TAREAS DEL DIA</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>n°</Th>
                            <Th>Title</Th>
                            <Th>Description</Th>
                            <Th>Done</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {AllTask.map((e, i) => {
                            return (
                                <Tr key={i}>
                                    <Td>{i}</Td>
                                    <Td>{e.title}</Td>
                                    <Td>{e.description}</Td>
                                    <Td>{e.done
                                        ? <Button onClick={() => handleDone(e._id)}>Done</Button>
                                        : <Button onClick={() => handleDone(e._id)}>UnDone</Button>}
                                    </Td>
                                    <Td>
                                        <Stack direction={'row'}>
                                            <Button><Link to={`/Edit/${e._id}`}>Modify</Link></Button>
                                            <Divider orientation="vertical" />
                                            <Button onClick={() => handleDeleteTask(e._id)}>Delete</Button>
                                        </Stack>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Home