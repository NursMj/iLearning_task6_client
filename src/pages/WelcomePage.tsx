import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Alert, Form, Button, Container } from 'react-bootstrap'

function WelcomePage({setIsLogedIn}:any) {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [error, setError] = useState('')

  function storeUserName() {
    localStorage.setItem('userName', userName);
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    if (userName === '') return setError('Please tell us your name')
    storeUserName()
    setIsLogedIn(true)
    navigate('/user')
  }

  function handleInput(e: any) {
    setUserName(e.target.value)
    setError('')
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className='mt-5' style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title>Welcome! Please tell us your name</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name='userName'
                type="text"
                value={userName}
                placeholder="Enter your name"
                onChange={handleInput}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-3'>
              Enter
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default WelcomePage
