import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImgNotFound from '../img/image_not_found.jpg'
import ScaleBar from './ScaleBar'

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false
    }
  }

  handleAddCard = (card) => {
    this.props.addCard(card)
  }

  handleRemoveCard = (id) => {
    this.props.removeCard(id)
  }

  toggle = (renderState) => {
    this.setState({
      toggle: renderState,
    })
  }

	render() {
    let cardAttr = {
      image_url: this.props.card.imageUrl ? this.props.card.imageUrl : ImgNotFound,
      name : this.props.card.name,
      hp_per: '',
      strength_per: '',
      weakness_per: '',
      happiness_num: 0,
    }
    
    let hp = parseInt(this.props.card.hp, 10)
    const attacks = this.props.card.attacks ? this.props.card.attacks : []
    const strength = attacks.length
    let weakness = 0
    let damages = 0
    let happiness = 0

    // set hp
    if(!Number.isNaN(hp)) {
      if(hp >= 100) {
        cardAttr.hp_per = 100 + '%'
      } else {
        cardAttr.hp_per = (hp + 100) % 100 + '%'
      }
    } else {
      hp = 0
      cardAttr.hp_per = 0 + '%'
    }

    // set strength
    switch(strength){
      case 2 : cardAttr.strength_per = 100 + '%'; break;
      case 1 : cardAttr.strength_per = 50 + '%'; break;
      default : cardAttr.strength_per = 0 + '%'; break;
    }

    // set weakness
    weakness = this.props.card.weaknesses ? 1 : 0
    cardAttr.weakness_per = (weakness * 100) + '%'

    // calculate accumulate damage and set happiness
    attacks.forEach(attack => {
      const damage = attack.damage !== '' ? parseInt(attack.damage.replace(/\D/g,''), 10) : 0
      damages += damage
    });
    happiness = ((hp / 10) + (damages / 10) + 10 - (weakness / 100)) / 5
    cardAttr.happiness_num = happiness % Math.floor(happiness) < 0.5 ? Math.floor(happiness) : Math.ceil(happiness)

    // set button
    let button
    const buttonStyle = {
      display: this.state.toggle ? 'block' : 'none',
      position : 'absolute',
      top: '0px',
      right: '0px',
      borderRadius: '100%',
      backgroundColor: 'rgba(0,0,0,0)',
      color: '#dc7777',
      margin: '15px 20px 0 0',
      zIndex: '999',
      outlineStyle: 'none',
      boxShadow: 'none',
      borderColor: 'transparent',
    }
    if(this.props.function === "add") {
      button = <Button style={buttonStyle} onClick={() => this.handleAddCard(this.props.card)}>Add</Button>
    } else if(this.props.function === "remove") {
      button = <Button style={buttonStyle} onClick={() => this.handleRemoveCard(this.props.card.id)}>X</Button>
    }

    const cardStyle = {
      boxShadow: this.state.toggle ? '1px 1px 5px 1px' : '',
      padding: "10px",
      backgroundColor: "#f3f4f7",
      border: "solid 1px #cccccc"
    }

    return (
      <div style={cardStyle} onMouseEnter={() => {this.toggle(true)}} onMouseLeave={() => {this.toggle(false)}}>
        {button}
        <Row>
          <Col xs="5"style={{margin: 'auto'}}>
            <img
              src={cardAttr.image_url}
              alt={cardAttr.name}
              style={{width: this.props.imageWidth}}
            />
          </Col>
          <Col xs="7" style={{margin: '30px 0 30px 0'}}>
            <Row style={{marginBottom: "20px", fontSize: "30px", fontFamily: 'Gaegu, cursive'}}>
              <Col>
                {cardAttr.name}
              </Col>
            </Row>
            <Row style={{marginBottom: "20px"}}>
              <Col>
                HP :
              </Col>
              <Col>
                <ScaleBar value={cardAttr.hp_per}/>
              </Col>
            </Row>
            <Row style={{marginBottom: "20px"}}>
              <Col>
                strength :
              </Col>
              <Col>
                <ScaleBar value={cardAttr.strength_per}/>
              </Col>
            </Row>
            <Row style={{marginBottom: "20px"}}>
              <Col>
                weakness :
              </Col>
              <Col>
                <ScaleBar value={cardAttr.weakness_per}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <ScaleBar value={cardAttr.happiness_num}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Card
