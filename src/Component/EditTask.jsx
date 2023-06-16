import { Box, Button, Divider, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncEditTask } from "../redux/slice";

function EditTask() {
    const { id } = useParams()
    const dispatch = useDispatch()
    let { AllTask } = useSelector(state => state.TodoReducer)
    let [task] = AllTask?.filter(e => e._id === id)
    const navigate = useNavigate()
    const [input, setInput] = useState({
        title: task.title,
        description: task.description
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
    }

    function handleSubmit(id, taskupdate) {
        dispatch(asyncEditTask(id, taskupdate))
        navigate('/')
    }

    return (
        <Box>
            <Stack bg={'teal'} w='40%' p={'2rem'} borderRadius='1rem' m={'3rem auto'}>
                <Heading>Edit Task</Heading>
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

                    <Button mt={4} colorScheme='teal' type='submit' onClick={() => handleSubmit(id, input)}>
                        Update
                    </Button>
                    <Divider display={"inline"} margin={'10px'} />
                    <Button mt={4} colorScheme='teal' type='submit' onClick={() => navigate('/')}>
                        Back
                    </Button>
                </FormControl>
            </Stack>
        </Box>
    )
}

export default EditTask