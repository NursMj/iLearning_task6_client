import { Container, Row, Col } from "react-bootstrap"
import MessageForm from "../components/MessageForm"
import MessageList from "../components/MessageList"


function UserPage() {
  const userName = localStorage.getItem('userName')

  return (
    <Container className="mt-4 mb-4">
      <h2>Hello {userName}!</h2>
      <Row className='mt-3'>
        <Col sm={12} md={5} className="mb-4">
          <MessageForm />
        </Col>
        <Col sm={12} md={7}>
          <MessageList />
        </Col>
      </Row>
    </Container>
  )
}

export default UserPage