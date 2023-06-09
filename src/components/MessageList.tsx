import { useState, useEffect } from 'react'
import { Accordion, Spinner, Modal, Button  } from "react-bootstrap"
import axios from "axios"
import io from 'socket.io-client';

const apiUrl = 'https://ilearning-task5-api.onrender.com'

const socket = io(apiUrl)

function MessageList() {
    const url = apiUrl + "/messages"
    const userName = localStorage.getItem('userName')
    const [messageList, setMessageList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [loadFail, setLoadFail] = useState(false)
    const [receiveMessage, setReceiveMessage] = useState(false)
    const [receivedMessage, setReceivedMessage] = useState<any>({})

    function showRecievedMessage(message: any) {
        setReceiveMessage(true)
        setReceivedMessage(message)
        fetchMessages()
    }

    function handleClose() {
        setReceiveMessage(false)
        setReceivedMessage({})
    }

    async function fetchMessages() {
        setIsLoading(true)
        try {
        const response = await axios.get(url + `?recipient=${userName}`)
        const data = response.data
        setMessageList(data)
        } catch (err: any) {
            setLoadFail(true)
            console.log(err)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchMessages()
        socket.emit('joinRoom', userName)
    }, [])

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            showRecievedMessage(message)
        })
    }, [socket])

    return (
        <Accordion className='border-redius p-2'>
            <h4>Your inbox</h4>
            {isLoading &&  <Spinner animation="border" role="status"></Spinner>}
            {messageList.length === 0 && !isLoading && <p>Your inbox is empty</p>}
            {loadFail && <p>Failed to load messages</p>}
            {receiveMessage && (
                 <Modal show={receiveMessage} onHide={handleClose}>
                 <Modal.Header closeButton>
                   <Modal.Title>
                        You've got new massage from {receivedMessage.from}
                    </Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                    <strong>Title: {receivedMessage.title}</strong> <br />
                    {receivedMessage.messageBody}
                </Modal.Body>
                 <Modal.Footer>
                   <Button variant="primary" onClick={handleClose}>
                     Ok
                   </Button>
                 </Modal.Footer>
               </Modal>
            )}
            {messageList.length != 0 && messageList.map((m: any, i) => {
                return (
                    <Accordion.Item eventKey={''+i} key={m.id}>
                        <Accordion.Header>
                            Form: {m.from} <br /> 
                            At time: {m.createdAt.slice(0, -8)} <br /> 
                            Title: {m.title}
                        </Accordion.Header>
                        <Accordion.Body>{m.messageBody}</Accordion.Body>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    )
}

export default MessageList