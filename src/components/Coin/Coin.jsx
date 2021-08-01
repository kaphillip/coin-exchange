import React, { Component } from 'react'
//import './Coin.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//removing use of .css file in favor of styled-components

const StyledTd = styled.td `
border: 1px solid #e9ebe4;
width: 25vh;
`

export default class Coin extends Component {
    constructor(props) {
        super(props);
        //props declared in the this.state can have their values changed throughout the lifecycle of the active app
        this.state = {
            price: this.props.price
        }
        // Ensure handleClick is properlly associated to "this"
        this.handleClick = this.handleClick.bind(this);
    }
/* Commenting out to build/test "Refresh" button functionality

    //can call API or perform some operation
    componentDidMount() {
        const callback = () => {
            // set the state to a new random value
            const randomPercentage = 0.995 + Math.random() * 0.01;

            //DON'T DO THE BELOW  this.state.price should never be a left-value accept in the constructor
                //this.state.price = this.state.price * randomPercentage;

            //DO THIS INSTEAD
            this.setState( function(oldState) {
                return {
                    price: oldState.price * randomPercentage
                };
            });
        }
        setInterval( callback, 1000 );
    }
*/

    handleClick(event) {
        // Prevent the default action of submitting the form
        event.preventDefault();

        const randomPercentage = 0.995 + Math.random() * 0.01;
        this.setState( function(oldState) {
            return {
                price: oldState.price * randomPercentage
            };
        });
    }

    render() {
        return (
            <tr>
              <StyledTd>{this.props.coin}</StyledTd>
              <StyledTd>{this.props.ticker}</StyledTd>
              <StyledTd>${this.state.price}</StyledTd>
              <StyledTd>
                  <form action="#" method="POST">
                    <button onClick={this.handleClick}>Refresh</button>
                  </form>
              </StyledTd>
            </tr>
          );
    }
}

Coin.propTypes = {
    coin: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}