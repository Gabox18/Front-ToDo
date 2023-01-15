import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { asyncPostTask, asyncGetTask } from "../redux/slice.js"

function Home() {
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetTask())
    }, [dispatch])

    function handleSubmit() {
        dispatch(asyncPostTask({
            title: "2da desde el front",
            description: "segunda tarea guardada desde el front"
        }))
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleSubmit}>add Task</button>
        </div>
    )
}

export default Home