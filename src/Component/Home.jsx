import { Box, Button, Divider, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncPostTask, asyncGetTask } from "../redux/slice.js"

function Home() {
    let dispatch = useDispatch()
    let { AllTask } = useSelector(state => state.TodoReducer)

    const [input, setInput] = useState('')
    const handleInputChange = (e) => setInput(e.target.value)
    const isError = input === ''

    useEffect(() => {
        dispatch(asyncGetTask())
    }, [dispatch])

    function handleSubmit() {
        dispatch(asyncPostTask({
            title: "enviada desde el fronttttttt",
            description: "prueba caiman"
        }))
    }

    return (
        <Box display={"flex"}>
            <Stack bg={'teal'} w='30%' p={'2rem'} borderRadius='1rem' m={'2rem'}>
                <Heading>Add Task</Heading>
                <FormControl isInvalid={isError}>
                    <FormLabel>Write a Title</FormLabel>
                    <Input type='email' value={input} onChange={handleInputChange} />
                    {!isError ? (
                        <FormHelperText>
                            The title is valid.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Title is required.</FormErrorMessage>
                    )}
                    <Button mt={4} colorScheme='teal' type='submit' onClick={handleSubmit}>
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
                                            <Button>Delete</Button>
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