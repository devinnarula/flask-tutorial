import React, {useState, useEffect} from 'react';
import { Card } from '../Components/Card/card'
import { Form } from '../Components/Form/form'


export const TodoPage = ()=> {

    const [todo, setTodo] = useState([])
    const [addTodo, setAddTodo] = useState('')

    useEffect(()=> {
        fetch('https://todolistflasktutorial.herokuapp.com/api').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setTodo(data))
    },[])

    const handleFormChange = (inputValue) => {
        setAddTodo(inputValue)
    }

    const handleFormSubmit = () => {
        fetch('https://todolistflasktutorial.herokuapp.com/api/create', {
            method: 'POST',
            body: JSON.stringify({
                content: addTodo
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
            .then(message => {
                console.log(message)
                setAddTodo('')
                getLatestTodos()
            })
    }
    
    const getLatestTodos = () => {
        fetch('https://todolistflasktutorial.herokuapp.com/api').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setTodo(data))
    }

    return(
        <>
            <h1>My To Do List</h1>
            <Form userInput={addTodo} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit}/>
            <Card listOfTodos={todo}/>
        </>
    )
}