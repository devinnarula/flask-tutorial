import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form } from '../Form/form'

export const Edit = ({ id, updateTodo }) => {
    const [addTodo, setAddTodo] = useState('')

    const history = useHistory()

    const handleFormChange = (inputValue) => {
        setAddTodo(inputValue)
    }

    const editTodo = ()=> {
        fetch(`api/edit/${id}`,{
            method: 'POST',
            body: JSON.stringify({
                id: id,
                content: addTodo
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                updateTodo()
            })
    }

    return(
        <>
            <div>Change Todo:</div>
            <Form userInput={addTodo} onFormChange={handleFormChange} onFormSubmit={editTodo}/>
        </>
    )
}