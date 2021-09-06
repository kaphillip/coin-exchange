//import React, { Component } from 'react'  //for class component use
import React from 'react';  //for functional component use
//import './Coin.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//removing use of .css file in favor of styled-components

const StyledTd = styled.td `
border: 1px solid #e9ebe4;
width: 25vh;
`

export default function Coin(props) {

    const handleClick = (event) => {
        // Prevent the default action of submitting the form
        event.preventDefault();
        props.handleRefresh(props.id);
    }


    let coinBalanceContent = null;

    if (props.showCoinBalanceHeader) {
        //to ensure correct jsx, make sure you use a react fragment
        coinBalanceContent = <StyledTd>{props.balance}</StyledTd>;
    }
    //Better Solution - ignore logic above and use this below instead
        //{this.props.toggleBalance ? <StyledTd>{this.props.balance}</StyledTd> : null}
    return (
        <tr>
            <StyledTd>{props.rank}</StyledTd>
            <StyledTd>{props.name}</StyledTd>
            <StyledTd>{props.ticker}</StyledTd>
            {coinBalanceContent}
            <StyledTd>${props.price}</StyledTd>
            <StyledTd>
                <form action="#" method="POST">
                <button onClick={handleClick}>Refresh</button>
                </form>
            </StyledTd>
        </tr>
        );
}


Coin.propTypes = {
    id: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
}