import React, { Component } from 'react'
import Star from '../img/cute.png'

class ScaleBar extends Component {
  createPercentBar = (size) => {
    const style = {
      height: '100%',
      width: size,
      textAlign: 'center',
      backgroundColor: '#f3701a',
      boxShadow: '1px 0px 0px 0px',
      borderRadius: size !== '100%' ? '0 6px 6px 0' : ''
    }

    return (
      <div style={{height: "90%", backgroundColor: "#e4e4e4", boxShadow: "0px 1px 1px 0px"}}>
        <div style={style}>{size}</div>
      </div>
    )
    
  }

  createStarBar = (size) => {
    const style = {
      display: 'inline-block',
      width: "17px",
      margin: "3px",
    }
    let stars = []

    for (let i = 1; i <= size; i++) {
      stars.push(i)
    }

    const starBar = stars.map((i) => {
      return (
        <img
          key={i}
          src={Star}
          alt=""
          style={style}
        />
      )
    })
  
    return (
      <div style={{height: "90%"}}>
        {starBar}
      </div>
    )
    
  }

  render() {
    let value = this.props.value.toString()
    const bar = value.indexOf('%') !== -1 ? this.createPercentBar(value) : this.createStarBar(value)
    
    return (
      <div>
        {bar}
      </div>
    )
  }
}

export default ScaleBar