import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom'
import { Delete } from '../Components/Delete/delete'
import { Edit } from '../Components/Edit/edit'

export const Show = () => {
    const { id } = useParams()
    const [todo, setTodo] = useState([])

    useEffect(()=> {
        fetch(`https://todolistflasktutorial.herokuapp.com/api/${id}`)
        .then(response => response.json())
        .then(data => setTodo(data))
    }, [id])

    const getLatestTodo = () => {
        fetch(`https://todolistflasktutorial.herokuapp.com/api/${id}`).then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setTodo(data))
    }

    return(
        <div>
            {todo.length > 0 && todo.map(data => <div key={id}>{data.content}</div>)}
            <Delete id={id}/>
            <hr></hr>
            <Edit id={id} updateTodo={getLatestTodo}/>
            <hr></hr>
            <Link to='/'>Back to todos</Link>
        </div>
    )
}