import { Box, Button, Divider, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncPostTask, asyncGetTask, asyncDeleteTask } from "../redux/slice.js"

function Home() {
    let dispatch = useDispatch()
    let { AllTask } = useSelector(state => state.TodoReducer)

    const [input, setInput] = useState({
        title: "",
        description: ""
    })
    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        console.log(input)
    }
    const isError = input.title === '' || input.description === ''

    useEffect(() => {
        dispatch(asyncGetTask())
    }, [dispatch])

    //-------------------------------------HANDLES-------------------------------------------------

    function handleTaskSubmit() {
        dispatch(asyncPostTask(input))
        setTimeout(() => {
            dispatch(asyncGetTask())
        }, 100);
    }

    function handleDeleteTask(id) {
        dispatch(asyncDeleteTask(id))
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
                        <FormHelperText>
                            The title is valid.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Title is required.</FormErrorMessage>
                    )}

                    <FormLabel>Description</FormLabel>
                    <Input type='text' name="description" value={input.description} onChange={handleInputChange} />
                    {!isError ? (
                        <FormHelperText>
                            The Description is valid.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Title is required.</FormErrorMessage>
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
                                        ? <Button>Done</Button>
                                        : <Button>UnDone</Button>}
                                    </Td>
                                    <Td>
                                        <Stack direction={'row'}>
                                            <Button>Modify</Button>
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