import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './Card'

class PokeSearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
    }
    this.inputRef = React.createRef()
  }

  removeUnRenderCards = (cards, unRenderCards) => {
    let result = cards
    unRenderCards.forEach((unRenderCard) => {
      result = result.filter(r => r.id !== unRenderCard.id)
    })
    return result
  }

  search = () => {
    const searchText = this.inputRef.current.value.toString()
    const apiEndPoint = 'http://127.0.0.1:3030/api/cards'

    if(searchText === '') {
      axios.get(apiEndPoint)
			.then((response) => {
        let result =  response.data.cards
				this.setState({
          cards: result
        })
			})
			.catch((error) => {
				console.log("error with first query", error);
      });

      return false
    }

    let result = []
    axios.get(`${apiEndPoint}?name=${searchText}`)
			.then((response) => {
        result = response.data.cards

        axios.get(`${apiEndPoint}?type=${searchText}`)
          .then((res) => {
            const result2 = res.data.cards

            result2.forEach(r2 => {
              result = result.filter(r => r.id !== r2.id)
            });
            result = result.concat(result2)

            this.setState({
              cards: result
            })
          })
          .catch((err) => {
            console.log("error with searching type", err)
          })
			})
			.catch((error) => {
				console.log("error with searching name", error);
      });
  }

	componentDidMount(){
    this.inputRef.current.focus();
    this.search()
  }

	render() {
    const unRenderCards = this.props.unRenderCards !== [] ? this.props.unRenderCards : []
    const trueCards = this.removeUnRenderCards(this.state.cards, unRenderCards)
    const renderedCards = trueCards.map((card) => {
      return (
        <Row key={card.id} style={{padding: "10px"}}>
          <Col>
            <Card card={card} function="add" addCard={this.props.addCard}></Card>
          </Col>
        </Row>
      )
    })

    return (
      <div style={{height: "100%"}}>
        <div style={{height: "10%"}}>
          <Row>
            <Col>
              <center>
                <input
                  style={{width: "100%", borderRadius: "10px", outlineStyle: 'none', boxShadow: 'none', fontSize: "25px", fontFamily: "Gaegu, cursive"}}
                  ref={this.inputRef}
                  type="text"
                  placeholder="Find pokemon"
                  onChange={this.search}
                />
              </center>
            </Col>
          </Row>
        </div>
        <div style={{height: "90%", overflowX: "hidden", overflowY: "auto"}}>
          {renderedCards}
        </div>
      </div>
    )
  }
}

export default PokeSearchBox
