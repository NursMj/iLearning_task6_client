import { useState, useEffect } from "react"
import { Card, Alert, Form, Button, Spinner } from 'react-bootstrap'
import { TextField, InputLabel } from '@mui/material'
import AutocompleteInput from './AutocompleteInput'
import axios from "axios"

const apiUrl = 'https://ilearning-task5-api.onrender.com'


function MessageForm() {
    const url = apiUrl + "/messages"
    const userName = localStorage.getItem('userName')
    const [recipient, setRecipient] = useState('')
    const [title, setTitle] = useState('')
    const [messageBody, setMessageBody] = useState('')
    const [error, setError] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])

    function getMessage() {
        return {
            from: userName,
            to: recipient,
            title: title,
            messageBody: messageBody,
        }
    }

    function showResultOfSending(isSuccess: boolean) {
        if (isSuccess) {
            setIsSuccess(true)
            setTimeout(()=> setIsSuccess(false), 2500)
        } else {
            setError('Message sending failed. Try again later.')
            setTimeout(()=> setError(''), 2500)
        }
    }

    async function fetchUsers() {
        try {
            const response = await axios.get(url)
            const data = response.data
            setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function postMessage() {
        setIsLoading(true)
        try {
            await axios.post(url, getMessage())
            showResultOfSending(true)
        } catch (error) {
            showResultOfSending(false)
        }
        setIsLoading(false)
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        if ([recipient, title, messageBody].includes('')) return setError('Please fill all fields')
        setError('')
        postMessage()
    }    

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <Card>
            <Card.Body>
                <Card.Title>Send new message</Card.Title>
                {isLoading &&  <Spinner animation="border" role="status"></Spinner>}
                {error && <Alert variant="danger">{error}</Alert>}
                {isSuccess && <Alert variant="success">Message sent successfully</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mt-3" controlId="recipient">
                    <InputLabel htmlFor="my-input">Recipient</InputLabel>
                        <AutocompleteInput 
                            users={users} 
                            inputName='recipient'
                            selected={recipient}
                            setSelected={setRecipient} 
                        />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="title">
                        <InputLabel htmlFor="Title">Title</InputLabel>
                        <TextField
                            fullWidth
                            placeholder="Enter the Title"
                            value={title}
                            onChange={e=> setTitle(e.target.value)}
                            id="Title"
                            variant="outlined"
                            InputProps={{
                            endAdornment: null
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="messageBody">
                        <TextField
                            label="Enter your message"
                            multiline
                            rows={4}
                            fullWidth
                            value={messageBody}
                            onChange={e=> setMessageBody(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='mt-3'>
                        Send message
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default MessageForm