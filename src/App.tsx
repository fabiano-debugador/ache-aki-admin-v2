
import { Home } from "./Components/Home"
import { Alunos } from "./Components/Alunos"
import { Sobre } from "./Components/Sobre"
import { BrowserRouter, Routes, Link, Route, Router } from 'react-router-dom'
import { Nav } from "react-bootstrap"

function App() {

  return (
    <div className="App">
      <h1> Cadastro de Motoboys</h1>

      <BrowserRouter>
        <Nav variant="tabs">
          <Nav.Link as={Link} to="/"> Pagina Inicial </Nav.Link>
          <Nav.Link as={Link} to="/alunos"> Cadastro de Motoboy </Nav.Link>
          <Nav.Link as={Link} to="/sobre"> Sobre </Nav.Link>
        </Nav>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/alunos" element={<Alunos />}></Route>
          <Route path="/sobre" element={<Sobre />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App