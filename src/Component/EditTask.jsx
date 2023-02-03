import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { asyncEditTask } from "../redux/slice";

function EditTask() {
    const { id } = useParams()
    const dispatch = useDispatch()
    let { AllTask } = useSelector(state => state.TodoReducer)
    let [task] = AllTask?.filter(e => e._id === id)
    const [input, setInput] = useState({
        title: task.title,
        description: task.description
    })

    function handlechange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(id, taskupdate) {
        dispatch(asyncEditTask(id, taskupdate))
    }

    return (
        <Box>
            <Heading>Edit Task</Heading>
            <VStack w={'30%'} m={'auto'}>
                <Input type={'text'} name={'title'} value={input.title} onChange={handlechange} />
                <Input type={'text'} name={'description'} value={input.description} onChange={handlechange} />
            </VStack>
            <Button onClick={() => handleSubmit(id, input)}>Update</Button>
        </Box>
    )
}

export default EditTask