import React, { Component } from 'react'
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokeSearchBox from './PokeSearchBox'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.modalRef = React.createRef()
  }
  componentDidMount() {
    window.onclick = (event) => {
      if (event.target === this.modalRef.current) {
        this.props.toggleModal()
      }
    }
  }

	render() {
    const modalStyle = {
      display: this.props.modal ? "block" : "none",
      transition: "0.5s",
      position: "absolute",
      zIndex: 999,
      paddingTop: "40px",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden",
      backgroundColor: "rgba(0,0,0,0.4)",
    }
    const modalContentStyle = {
      backgroundColor: "#fefefe",
      margin: "auto",
      padding: "20px",
      border: "1px solid #888",
      width: "90%",
      height: "85%"
    }

    const modal = this.props.modal
      ? <div id={this.props.id} style={modalStyle} ref={this.modalRef}>
        <div style={modalContentStyle}>
          <Container style={{height: "100%"}}>
            <PokeSearchBox unRenderCards={this.props.unRenderCards} buttonLabel="Search" addCard={this.props.addCard}/>
          </Container>
        </div>
      </div>
      : null

    return (
      <div>
        {modal}
      </div>
    )
  }
}

export default Modal
