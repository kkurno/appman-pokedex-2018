import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Card from './components/Card'
import Modal from './components/Modal'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      modal: false,
    }
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  addCard = (card) => {
    this.setState({
      cards: [...this.state.cards, card ]
    })
  }

  removeCard = (id) => {
    this.setState({
      cards: this.state.cards.filter(card => card.id !== id)
    })
  }

  render() {
    const searchButtonStyle = {
      backgroundColor: '#ec5656',
      top: 0,
      width: '120px',
      height: '120px',
      border: 'solid 1px rgba(0,0,0,0)',
      marginTop: '-7.5%',
      borderRadius: '100%',
      fontSize: '80px'
    }

    const myCards = this.state.cards.map((card) => {
      return (
        <Col xs="6" key={card.id} style={{padding: "10px"}}>
          <Card card={card} function="remove" removeCard={this.removeCard} imageWidth="150px"></Card>
        </Col>
      )
    })

    return (
      <div className="App">
        <header>
          <div>
            <div className="title">
              <h1>My Pokedex</h1>
            </div>
          </div>
        </header>
        <section>
          <div style={{height: "575px"}}>
            <div className="content">
              <Container>
                <Row>
                  {myCards}
                </Row>
              </Container>
            </div>
          </div>
          <div className="footer">
            <Button style={searchButtonStyle} onClick={this.toggleModal}>+</Button>
          </div>
        </section>
        <Modal id="modal" modal={this.state.modal} unRenderCards={this.state.cards} addCard={this.addCard} toggleModal={this.toggleModal.bind(this)}/>
      </div>
    )
  }
}

export default App
