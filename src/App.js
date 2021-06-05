import './App.css';
import './components/Dashboard'
import Dashboard from './components/Dashboard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './components/Header';

function App() {
  return (
    <Container>
      <Header/>
      <Row>
        <Col>
          <Dashboard/>
        </Col>
      </Row>
    </Container>
    
  );
}

export default App;
