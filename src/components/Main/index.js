import React, { Component } from 'react'
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'

import './style.css'

export default class Main extends Component {

  state = {
    value: '',
    inputValue: '',
    toBinary: false, 
    invalidInput: false
  }

  handleChange = () => {
    const value = this.state.toBinary
    this.setState({ toBinary:  !value, inputValue: '' });
  }

  handleInputChange = e => {
    const { toBinary } = this.state
    const inputValue = e.target.value


    const onlyNumbers = new RegExp(/^\d+$/)
    const onlyBinary = new RegExp(/^[0-1]+$/)    

    if (inputValue !== '') {

      if (!toBinary && !onlyBinary.test(inputValue)) {
        this.setState({ invalidInput: true })
        return 
      }
      
      if (toBinary && !onlyNumbers.test(inputValue)) {
        this.setState({ invalidInput: true })
        return
      }

    }
    this.setState({ 
      inputValue: toBinary ? Number(inputValue) : inputValue, 
      invalidInput: false
    })
  }

  generateBinary = array => {
    const reverseArray = array.reverse()
    const joinArray = reverseArray.join('')

    return joinArray
  }

  convertToDecimal = () => {
    const binary = this.state.inputValue

    if (binary === '') {
      this.setState({ value: '' })
      return
    } 

    const array = binary.toString().split('')
    const lastPosition = array.length - 1
    let value = 0
    
    for (let i in array) {
      value += array[lastPosition - i] * Math.pow(2,i) 
    }

    this.setState({ value })
  }

  convertToBinary = () => {
    let quotient = this.state.inputValue
  
      if (quotient === '') {
        this.setState({ value: '' })
        return
      }

      const array = []
      do { 

        array.push((quotient%2).toString())
        quotient = Math.floor(quotient / 2)

      } while (quotient !== 0)

      const value = this.generateBinary(array)

      this.setState({ value })
  }

  render () {
    const { value, toBinary, inputValue, invalidInput } = this.state

    return (
      <div className="main-div">
        {
          invalidInput 
          ? <span className="text-danger">only {toBinary ? '' : 'binary'} numbers are allowed</span>
          : null
        }
        <div className="top-main-div">
          <label>To {toBinary ? 'Binary' : 'Decimal'}</label>
          <Button 
            className="change-button"
            color={toBinary ? 'info' : 'secondary'}
            onClick={this.handleChange}
          >{toBinary ? 'To Decimal' : 'To Binary'}</Button>
        </div>
        <InputGroup>
          <Input 
            placeholder={toBinary ? '100' : '1100100'} 
            onChange={this.handleInputChange}
            value={inputValue}
            invalid={invalidInput}
          ></Input>
          <InputGroupAddon>
            <InputGroupText>{value === '' ? '...' : value}</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <Button color="outline-success" className="transform-button"
          onClick={toBinary ? this.convertToBinary : this.convertToDecimal}
        >Transform</Button>
      </div>
    )
  } 
}