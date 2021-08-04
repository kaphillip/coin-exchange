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
/* removing old logic to ensure the state is not redundant, 
so we're going to uplift the state; adding handleClick binding*/
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(event) {
        // Prevent the default action of submitting the form
        event.preventDefault();

        //to know how to refer to the correct coin row; ticker is our key in CoinList.jsx
        this.props.handleRefresh(this.props.ticker);

/* removing part of handleClick functionality by using prop drilling to lift the state up
        const randomPercentage = 0.995 + Math.random() * 0.01;
        this.setState( function(oldState) {
            return {
                price: oldState.price * randomPercentage
            };
        });
*/
    }

    render() {
        return (
            <tr>
              <StyledTd>{this.props.name}</StyledTd>
              <StyledTd>{this.props.ticker}</StyledTd>
              <StyledTd>${this.props.price}</StyledTd>
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
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}