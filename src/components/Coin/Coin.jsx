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

    handleClick = (event) => {
        // Prevent the default action of submitting the form
        event.preventDefault();
        this.props.handleRefresh(this.props.ticker);
    }

    render() {
        let coinBalanceContent = null;

        if (this.props.showCoinBalanceHeader) {
            //to ensure correct jsx, make sure you use a react fragment
            coinBalanceContent = <StyledTd>{this.props.balance}</StyledTd>;
        }
        //Better Solution - ignore logic above and use this below instead
          //{this.props.toggleBalance ? <StyledTd>{this.props.balance}</StyledTd> : null}
        return (
            <tr>
              <StyledTd>{this.props.name}</StyledTd>
              <StyledTd>{this.props.ticker}</StyledTd>
              {coinBalanceContent}
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
    balance: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
}