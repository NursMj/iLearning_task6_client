import { Container, Navbar, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function Header({isLogedIn, setIsLogedIn}:any) {
  const navigate = useNavigate()

  function logOut(): any {
    localStorage.clear()
    setIsLogedIn(false)
    navigate('/')
  }

  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            iLearning TASK #6 <br /> "Message someone" app
          </Navbar.Brand>
          {isLogedIn && <Button onClick={logOut}>Log out</Button>}
        </Container>
      </Navbar>
  )
}

export default Header